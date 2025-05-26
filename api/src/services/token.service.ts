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

export const generateToken = async (userId: string) => {
    if (!userId) {
        throw new Error('User ID is required to generate token');
    };

    try {
        const userExists = await prisma.user.findUnique({
            where: { id: userId },
            include: { auth: true }
        });

        if (!userExists || !userExists.auth) {
            throw new Error('User not found');
        };

        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 60 * 30; // 30 minutes in seconds
        
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
        throw new Error(`Error generating token: ${error.message}`);
    };
};

export const generateRefreshToken = async (userId: string) => {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 60 * 60 * 24 * 30; // 30 days in seconds

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
        await prisma.refreshToken.delete({
            where: { id: refreshToken }
        });
        
        throw new Error('Refresh token expired');
    };

    try {
        const { token, expiresIn, expiresAt } = await generateToken(refreshTokenExists.userId);

        return {
            token,
            expiresIn,
            expiresAt
        };
    } catch (error) {
        throw new Error('Error generating new access token');
    };
};