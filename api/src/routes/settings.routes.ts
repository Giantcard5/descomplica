import {
    Router,
    Request,
    Response
} from 'express';

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
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const profile = await getProfile(token);

    return response.json(profile);
});

router.post('/profile', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    // Create a validate function to check if the token is valid
    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const profile = await updateProfile(token, request.body);

    return profile;
});

router.get('/store', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const store = await getStore(token);

    return response.json(
        store
    );
});

router.post('/store', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    // Create a validate function to check if the token is valid
    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const store = await updateStore(token, request.body);

    return store;
});

router.get('/notifications', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const notifications = await getNotifications(token);

    return response.json(
        notifications
    );
});

router.post('/notifications', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const notifications = await updateNotifications(token, request.body);

    return notifications;
});

router.get('/security', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const security = await getSecurity(token);

    return response.json(
        security
    );
});

router.post('/security', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const security = await updateSecurity(token, request.body);

    return security;
});

router.get('/preferences', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const preferences = await getPreferences(token);

    return response.json(
        preferences
    );
});

router.post('/preferences', async (request: Request, response: Response) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const preferences = await updatePreferences(token, request.body);

    return preferences;
});

export const settingsRouter = router;