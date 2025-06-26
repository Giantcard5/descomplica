import { FetchService } from "../api/fetch-service";

export interface IUser {
    id: string;
    name: string;
    email: string;
    type: 'retailer' | 'industry';
}

class TokenService extends FetchService {
    private static instance: TokenService;
    private readonly ACCESS_TOKEN_KEY = 'access_token';

    private constructor() {
        super();
    }

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    async login(
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<{ type: 'retailer' | 'industry' }> {
        try {
            const response = await this.fetch('/api/auth/login', {
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
    ): Promise<IUser> {
        try {
            const response = await this.fetch('/api/auth/register', {
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
            await this.fetch('/api/auth/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async checkAuth(): Promise<IUser | null> {
        try {
            const response = await this.fetch('/api/auth/check', {
                credentials: 'include',
            });

            const data = await response.json();
            return data;
        } catch (error) {
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
            const response = await this.fetch('${this.API_URL}/api/token/refresh-token', {
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

    async resetPassword(password: string, token: string): Promise<void> { }

    async forgotPassword(email: string): Promise<void> { }
}

export const tokenService = TokenService.getInstance();
