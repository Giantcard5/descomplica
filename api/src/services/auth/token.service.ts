import { 
    sign 
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../../utils/prismaClient';

import { 
    ITokenPayload 
} from '../../types/token';

export class TokenService extends PrismaClientSingleton {
    private static instance: TokenService;

    private constructor() {
        super();
    }

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    async generateToken(userId: string, rememberMe?: boolean) {
        if (!userId) {
            throw new Error('User ID is required to generate token');
        };
    
        try {
            const userExists = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { auth: true }
            });
    
            if (!userExists || !userExists.auth) {
                throw new Error('User not found');
            };
    
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = rememberMe ? 60 * 60 * 24 : 60 * 30; // 1 day or 30 minutes
            
            const payload: ITokenPayload = {
                sub: userId,
                iat: now,
                type: userExists.auth.type
            };
    
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not configured');
            };
    
            const token = sign(payload, process.env.JWT_SECRET, { 
                expiresIn
            });
    
            return {
                token,
                expiresIn,
                expiresAt: new Date((now + expiresIn) * 1000)
            };
        } catch (error: any) {
            throw new Error(`Error generating token: ${error.message}`);
        };
    }

    async generateRefreshToken(userId: string) {
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 60 * 60 * 24 * 30; // 30 days in seconds
    
        const refreshToken = await this.prisma.refreshToken.create({
            data: {
                userId: userId,
                expiresIn: expiresIn,
                expiresAt: new Date((now + expiresIn) * 1000)
            }
        });
    
        return {
            token: refreshToken.id,
            expiresIn,
            expiresAt: new Date((now + expiresIn) * 1000)
        };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        };
    
        const refreshTokenExists = await this.prisma.refreshToken.findUnique({
            where: {
                id: refreshToken
            },
            include: {
                user: {
                    include: { auth: true }
                }
            }
        });
        
        if (!refreshTokenExists || !refreshTokenExists.user || !refreshTokenExists.user.auth) {
            console.log('Refresh token not found:', refreshToken);
            throw new Error('Refresh token not found');
        };
    
        const now = new Date();
        if (refreshTokenExists.expiresAt < now) {        
            await this.prisma.refreshToken.delete({
                where: { id: refreshToken }
            });
            
            throw new Error('Refresh token expired');
        };
    
        try {
            const { token, expiresIn, expiresAt } = await this.generateToken(refreshTokenExists.userId);
    
            return {
                token,
                expiresIn,
                expiresAt
            };
        } catch (error) {
            throw new Error('Error generating new access token');
        };
    }
}

export const tokenService = TokenService.getInstance();