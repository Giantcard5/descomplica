export interface LoginResponse {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
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
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private readonly USER_TYPE_KEY = 'user_type';

    private constructor() {
        // Ensure API_URL is properly set
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
                const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
                throw new Error(error.message || `HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
                }
                throw error;
            }
            throw new Error('An unexpected error occurred');
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
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(name: string, email: string, password: string, type: 'retailer' | 'industry'): Promise<User> {
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
            const response = await this.fetchWithError(`${this.API_URL}/api/auth/check`);
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error && error.message.includes('401')) {
                return null;
            }
            console.error('Auth check error:', error);
            throw error;
        }
    }

    async getUserType(): Promise<'retailer' | 'industry' | null> {
        // Client-side only
        if (typeof window === 'undefined') {
            return null;
        }

        const userType = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${this.USER_TYPE_KEY}=`))
            ?.split('=')[1];
        return (userType as 'retailer' | 'industry') || null;
    }

    async isAuthenticated(): Promise<boolean> {
        // Client-side only
        if (typeof window === 'undefined') {
            return false;
        }

        return document.cookie
            .split('; ')
            .some(row => row.startsWith(`${this.ACCESS_TOKEN_KEY}=`));
    }
}

export const tokenService = TokenService.getInstance(); 