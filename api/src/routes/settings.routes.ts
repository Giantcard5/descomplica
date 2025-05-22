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
    getPreferences
} from '../services/settings.service';

const router = Router();

router.get('/profile', async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const profile = await getProfile(token);

    return response.json({
        profile
    });
});

router.get('/store', async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const store = await getStore(token);

    return response.json({
        store
    });
});

router.get('/notifications', async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const notifications = await getNotifications(token);

    return response.json({
        notifications
    });
});

router.get('/security', async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const security = await getSecurity(token);

    return response.json({
        security
    });
});

router.get('/preferences', async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            message: 'Unauthorized'
        });
    };

    const preferences = await getPreferences(token);

    return response.json({
        preferences
    });
});

export const settingsRouter = router;