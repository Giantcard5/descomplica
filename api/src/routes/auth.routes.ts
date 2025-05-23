import {
    Router,
    Request,
    Response
} from 'express';

import {
    prisma
} from '../utils/prismaClient';

import {
    forgotPassword,
    loginUser,
    registerUser,
    resetPassword
} from '../services/auth.service';

import { verify } from 'jsonwebtoken';

const router = Router();

router.post('/login', async (request: Request, response: Response) => {
    const { email, password, rememberMe } = request.body;

    try {
        const { token, refreshToken, type } = await loginUser(email, password, rememberMe);

        const accessTokenExpires = new Date(Date.now() + (30 * 60 * 1000)); // 30 min
        const refreshTokenExpires = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        const userTypeExpires = new Date(Date.now() + (30 * 60 * 1000)); // 30 min

        response.cookie('access_token', token.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60 * 1000, // 30 min in ms
            expires: accessTokenExpires,
            path: "/",
        });

        response.cookie('refresh_token', refreshToken.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
            expires: refreshTokenExpires,
            path: "/",
        });

        response.cookie('user_type', type, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60 * 1000, // 30 min
            expires: userTypeExpires,
            path: "/",
        });

        return response.json({
            accessToken: token.token,
            accessTokenExpiresAt: token.expiresAt,
            refreshToken: refreshToken.token,
            refreshTokenExpiresAt: refreshToken.expiresAt,
            type
        });
    } catch (error) {
        return response.status(400).json({ message: 'Error logging in' });
    };
});

router.post('/register', async (request: Request, response: Response) => {
    const { name, email, password, type } = request.body;

    try {
        const user = await registerUser({ name, email, password, type });

        return response.json({
            name: user.name,
            email: user.email,
            type: user.type
        });
    } catch (error) {
        return response.status(400).json({ message: 'Error registering user' });
    };
});

router.post('/forgot-password', async (request: Request, response: Response) => {
    const { email } = request.body;

    try {
        const message = await forgotPassword(email);

        return response.json({ message });
    } catch (error) {
        return response.status(400).json({ message: 'Error sending email' });
    };
});

router.post('/reset-password', async (request: Request, response: Response) => {
    const { password, token } = request.body;

    try {
        const message = await resetPassword(password, token);

        return response.json({ message });
    } catch (error) {
        return response.status(400).json({ message: 'Error resetting password' });
    };
});

router.post('/logout', async (request: Request, response: Response) => {
    const refreshToken = request.cookies.refresh_token;

    if (refreshToken) {
        try {
            await prisma.refreshToken.delete({
                where: { id: refreshToken }
            });
        } catch (error) {
            console.error('Error deleting refresh token:', error);
        };
    };

    response.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    response.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    response.clearCookie('user_type', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
    
    return response.status(200).json({ message: 'Logged out successfully' });
});

router.get('/check', async (request: Request, response: Response) => {
    try {
        const accessToken = request.cookies.access_token;

        if (!accessToken) {
            return response.status(401).json({ message: 'Not authenticated' });
        };

        const decoded = verify(accessToken, process.env.JWT_SECRET as string) as {
            sub: string;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            select: {
                id: true,
                type: true,
            },
        });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        };

        return response.json({
            id: user.id,
            type: user.type
        });
    } catch (error) {
        console.error('Auth check error:', error);
        
        if (error instanceof Error) {
            if (error.name === 'JsonWebTokenError') {
                return response.status(401).json({ message: 'Invalid token' });
            }
            if (error.name === 'TokenExpiredError') {
                return response.status(401).json({ message: 'Token expired' });
            };
        };

        return response.status(500).json({ message: 'Internal server error' });
    };
});

export const authRouter = router;