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
    updateProfile
} from '../services/profile.service';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
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

router.post('/', async (request: Request, response: Response) => {
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

export const profileRouter = router;