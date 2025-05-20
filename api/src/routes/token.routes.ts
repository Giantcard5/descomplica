import {
    Router,
    Request,
    Response
} from 'express';

import {
    refreshToken
} from '../services/token.service';

const router = Router();

router.post('/refresh-token', async (request: Request, response: Response) => {
    const refreshTokenCookie = request.cookies.refreshToken;

    if (!refreshTokenCookie) {
        return response.status(401).json({ 
            message: 'Refresh token not found in cookies' 
        });
    };

    try {
        const result = await refreshToken(refreshTokenCookie);
        
        if (!result) {
            return response.status(401).json({ 
                message: 'Invalid refresh token' 
            });
        };

        const { token, expiresIn, expiresAt } = result;

        const refreshTokenExpires = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)); // 30 days

        response.cookie('refreshToken', refreshTokenCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            expires: refreshTokenExpires,
            path: '/api/token/refresh-token'
        });

        return response.json({
            accessToken: token,
            accessTokenExpiresIn: expiresIn,
            accessTokenExpiresAt: expiresAt
        });
    } catch (error: any) {
        console.error('Refresh token error:', error.message);
        
        response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/api/token/refresh-token'
        });

        if (error.message === 'Refresh token not found' || error.message === 'Refresh token expired') {
            return response.status(401).json({ 
                message: error.message 
            });
        };

        return response.status(400).json({ 
            message: 'Error refreshing token',
            error: error.message 
        });
    };
});

export const tokenRouter = router;