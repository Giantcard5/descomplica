import {
    Router,
    Request,
    Response
} from 'express';

import {
    validateAccessToken
} from '../../middleware/authenticated';

import {
    profileService
} from '../../services/settings/profile.service';

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
    const profile = await profileService.get(token);

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
    const updatedProfile = await profileService.update({ token, profile: request.body });

    return response.status(200).json(updatedProfile);
});

export const profileRouter = router;