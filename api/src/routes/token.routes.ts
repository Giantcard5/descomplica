import {
    Router,
    Request,
    Response
} from 'express';

import {
    tokenService
} from '../services/token.service';

const router = Router();

router.post('/refresh-token', async (request: Request, response: Response) => {
    const refreshTokenCookie = request.cookies.refresh_token;

    if (!refreshTokenCookie) {
        return response.status(401).json({ 
            message: 'Refresh token not found in cookies' 
        });
    };

    try {
        const result = await tokenService.refreshToken(refreshTokenCookie);
        
        if (!result) {
            return response.status(401).json({ 
                message: 'Invalid refresh token' 
            });
        };

        const { token, expiresIn, expiresAt } = result;
        const accessTokenExpires = new Date(Date.now() + (30 * 60 * 1000)); // 30 min

        response.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 60 * 1000, // 30 min in ms
            expires: accessTokenExpires,
            path: '/',
        });

        return response.json({
            accessToken: token,
            accessTokenExpiresIn: expiresIn,
            accessTokenExpiresAt: expiresAt
        });
    } catch (error: any) {
        response.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
        return response.status(401).json({ message: error.message });
    }
});

export const tokenRouter = router;