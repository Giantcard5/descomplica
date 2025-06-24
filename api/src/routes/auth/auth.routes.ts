import {
    Router,
    Request,
    Response
} from 'express';

import {
    authService
} from '../../services/auth/auth.service';

const router = Router();

router.post('/login', async (request: Request, response: Response) => {
    const { email, password, rememberMe } = request.body;

    try {
        const { token, refreshToken, type } = await authService.login({ email, password, rememberMe });

        const accessTokenExpires = new Date(Date.now() + (rememberMe ? 60 * 60 * 24 * 1000 : 30 * 60 * 1000)); // 1 day or 30 min
        const refreshTokenExpires = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        const userTypeExpires = new Date(Date.now() + (rememberMe ? 60 * 60 * 24 * 1000 : 30 * 60 * 1000)); // 1 day or 30 min

        response.cookie('access_token', token.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: rememberMe ? 60 * 60 * 24 * 1000 : 30 * 60 * 1000, // 1 day or 30 min in ms
            expires: accessTokenExpires,
            path: '/',
        });

        response.cookie('refresh_token', refreshToken.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
            expires: refreshTokenExpires,
            path: '/',
        });

        return response.json({
            accessToken: token.token,
            accessTokenExpiresAt: token.expiresAt,
            refreshToken: refreshToken.token,
            refreshTokenExpiresAt: refreshToken.expiresAt,
            type
        });
    } catch (error) {
        return response.status(400).json({ message: 'Email or password is incorrect' });
    };
});

router.post('/logout', async (request: Request, response: Response) => {
    const refreshToken = request.cookies.refresh_token;

    try {
        await authService.logout({ refreshToken, response });
    } catch (error) {
        return response.status(400).json({ message: 'Error logging out' });
    };
    
    return response.status(200).json({ message: 'Logged out successfully' });
});

router.post('/register', async (request: Request, response: Response) => {
    const { email, password, type, name } = request.body;

    try {
        const user = await authService.register({ email, password, type, name });

        return response.json({
            name: user.name,
            email: user.email,
            type: user.type
        });
    } catch (error) {
        return response.status(400).json({ message: 'Email already in use' });
    };
});

router.post('/forgot-password', async (request: Request, response: Response) => {
    const { email } = request.body;

    try {
        const message = await authService.forgotPassword({ email });

        return response.json({ message });
    } catch (error) {
        return response.status(400).json({ message: 'Error sending email' });
    };
});

router.post('/reset-password', async (request: Request, response: Response) => {
    const { password, token, currentPassword } = request.body;

    try {
        const message = await authService.resetPassword({ password, token, currentPassword });

        return response.json({ message });
    } catch (error) {
        return response.status(400).json({ message: 'Error resetting password' });
    };
});

router.get('/check', async (request: Request, response: Response) => {
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
        return response.status(401).json({ message: 'Not authenticated' });
    };
    
    const result = await authService.check({ accessToken });

    return response.json(result);
});

router.post('/onboarding', async (request: Request, response: Response) => {
    const { type, ...data } = request.body;
    const token = request.cookies.access_token;

    try {
        await authService.registerOnboarding({ type, data, token });

        return response.status(200).json({ message: 'Onboarding successful' });
    } catch (error) {
        return response.status(400).json({ message: 'Error onboarding' });
    };
});

export const authRouter = router;