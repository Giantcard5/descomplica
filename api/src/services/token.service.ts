import { 
    sign 
} from 'jsonwebtoken';

import { 
    prisma 
} from '../utils/prismaClient';

interface TokenPayload {
    sub: string;
    iat: number;
    exp?: number;
    type: 'access' | 'refresh';
}

export const generateToken = async (userId: string, rememberMe: boolean) => {
    if (!userId) {
        throw new Error('User ID is required to generate token');
    };

    try {
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            throw new Error('User not found');
        };

        const now = Math.floor(Date.now() / 1000);
        const expiresIn = rememberMe ? 60 * 60 * 24 * 7 : 60 * 15; // 7 days or 15 minutes
        
        const payload: TokenPayload = {
            sub: userId,
            iat: now,
            type: 'access'
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
        console.error('Error generating token:', error.message);
        throw new Error(`Error generating token: ${error.message}`);
    };
};

export const generateRefreshToken = async (userId: string) => {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 60 * 60 * 24 * 30; // 30 days

    const refreshToken = await prisma.refreshToken.create({
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
};

export const refreshToken = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new Error('Refresh token is required');
    };

    const refreshTokenExists = await prisma.refreshToken.findUnique({
        where: {
            id: refreshToken
        },
        include: {
            user: true
        }
    });
    
    if (!refreshTokenExists) {
        console.log('Refresh token not found:', refreshToken);
        throw new Error('Refresh token not found');
    };

    const now = new Date();
    if (refreshTokenExists.expiresAt < now) {
        console.log('Refresh token expired:', {
            tokenId: refreshTokenExists.id,
            expiresAt: refreshTokenExists.expiresAt,
            now
        });
        
        await prisma.refreshToken.delete({
            where: { id: refreshToken }
        });
        
        throw new Error('Refresh token expired');
    };

    try {
        const { token, expiresIn, expiresAt } = await generateToken(refreshTokenExists.userId, false);

        return {
            token,
            expiresIn,
            expiresAt
        };
    } catch (error) {
        throw new Error('Error generating new access token');
    };
};