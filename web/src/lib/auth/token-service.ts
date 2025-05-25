export interface LoginResponse {
    accessToken: string;
    accessTokenExpiresAt: string;
    type: 'retailer' | 'industry';
}

export interface User {
    id: string;
    name: string;
    email: string;
    type: 'retailer' | 'industry';
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    type: 'retailer' | 'industry';
}

class TokenService {
    private static instance: TokenService;
    private readonly API_URL: string;
    private readonly ACCESS_TOKEN_KEY = 'access_token';

    private constructor() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        if (!apiUrl) {
            console.warn('NEXT_PUBLIC_API_URL is not set, defaulting to http://localhost:3001');
        }
        this.API_URL = apiUrl || 'http://localhost:3001';
    }

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    private async fetchWithError(url: string, options: RequestInit = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await this.logout();
                    window.location.href = '/auth/login';
                    throw new Error('401');
                }
                const error = await response
                    .json()
                    .catch(() => ({ message: 'Unknown error occurred' }));
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error(
                        'Unable to connect to the server. Please check your internet connection and try again.'
                    );
                }

                if (error.message === '401') {
                    await this.logout();
                    window.location.href = '/auth/login';
                    throw new Error('401');
                }
                throw error;
            }
            throw new Error('An unexpected error occurred');
        }
    }

    private async fetchWithAutoRefresh(url: string, options: RequestInit = {}, retry = true) {
        try {
            return await this.fetchWithError(url, { ...options, credentials: 'include' });
        } catch (error) {
            if (
                retry &&
                error instanceof Error &&
                error.message.toLowerCase().includes('token expired')
            ) {
                try {
                    await this.refreshToken();
                    return await this.fetchWithError(url, { ...options, credentials: 'include' });
                } catch (refreshError) {
                    await this.logout();
                    throw new Error('Session expired. Please log in again.');
                }
            }
            throw error;
        }
    }

    async login(email: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
        try {
            const response = await this.fetchWithError(`${this.API_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async register(
        name: string,
        email: string,
        password: string,
        type: 'retailer' | 'industry'
    ): Promise<User> {
        try {
            const response = await this.fetchWithError(`${this.API_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password, type }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.fetchWithError(`${this.API_URL}/api/auth/logout`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        try {
            const response = await this.fetchWithError(`${this.API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }

    async resetPassword(password: string, token: string): Promise<{ message: string }> {
        try {
            const response = await this.fetchWithError(`${this.API_URL}/api/auth/reset-password`, {
                method: 'POST',
                body: JSON.stringify({ password, token }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    }

    async checkAuth(): Promise<User | null> {
        try {
            const response = await this.fetchWithAutoRefresh(`${this.API_URL}/api/auth/check`);
            const data = await response.json();
            return data;
        } catch (error) {
            if (
                error instanceof Error &&
                (error.message.includes('401') ||
                    error.message.toLowerCase().includes('not authenticated'))
            ) {
                return null;
            }
            console.error('Auth check error:', error);
            throw error;
        }
    }

    async getUserType(): Promise<'retailer' | 'industry' | null> {
        const user = await this.checkAuth();
        return user ? user.type : null;
    }

    async isAuthenticated(): Promise<boolean> {
        if (typeof window === 'undefined') {
            return false;
        }

        return document.cookie
            .split('; ')
            .some((row) => row.startsWith(`${this.ACCESS_TOKEN_KEY}=`));
    }

    async refreshToken(): Promise<{
        accessToken: string;
        accessTokenExpiresIn: number;
        accessTokenExpiresAt: string;
    }> {
        if (typeof window === 'undefined') {
            throw new Error('refreshToken can only be called on the client');
        }
        try {
            const response = await this.fetchWithError(`${this.API_URL}/api/token/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await response.json();
            return {
                accessToken: data.accessToken,
                accessTokenExpiresIn: data.accessTokenExpiresIn,
                accessTokenExpiresAt: data.accessTokenExpiresAt,
            };
        } catch (error) {
            console.error('Refresh token error:', error);
            throw error;
        }
    }
}

export const tokenService = TokenService.getInstance();