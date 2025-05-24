import {
    Router,
    Request,
    Response
} from 'express';

import { 
    validateAccessToken 
} from '../middleware/authenticated';

import {
    getProfile,
    getStore,
    getNotifications,
    getSecurity,
    getPreferences,
    updateProfile,
    updateStore,
    updateNotifications,
    updateSecurity,
    updatePreferences
} from '../services/settings.service';

const router = Router();

router.get('/profile', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    const profile = await getProfile(token);

    return response.json(profile);
});

router.post('/profile', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    await updateProfile(token, request.body);

    return response.status(200).json({ message: 'Profile updated successfully' });
});

router.get('/store', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    const store = await getStore(token);

    return response.json(store);
});

router.post('/store', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };

    const token = request.cookies.access_token;
    await updateStore(token, request.body);

    return response.status(200).json({ message: 'Store updated successfully' });
});

router.get('/notifications', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    const notifications = await getNotifications(token);

    return response.json(notifications);
});

router.post('/notifications', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    await updateNotifications(token, request.body);

    return response.status(200).json({ message: 'Notifications updated successfully' });
});

router.get('/security', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    const security = await getSecurity(token);

    return response.json(security);
});

router.post('/security', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    await updateSecurity(token, request.body);

    return response.status(200).json({ message: 'Security updated successfully' });
});

router.get('/preferences', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    const preferences = await getPreferences(token);

    return response.json(preferences);
});

router.post('/preferences', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
        if (error.message === 'Token expired') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
    
    const token = request.cookies.access_token;
    await updatePreferences(token, request.body);

    return response.status(200).json({ message: 'Preferences updated successfully' });
});

export const settingsRouter = router;