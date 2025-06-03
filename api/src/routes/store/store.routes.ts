import {
    Router,
    Request,
    Response
} from 'express';

import {
    validateAccessToken
} from '../../middleware/authenticated';

import {
    storeService
} from '../../services/store/store.service';

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
    const store = await storeService.get(token);

    return response.json(store);
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
    const updatedStore = await storeService.update({ token, store: request.body });

    return response.status(200).json(updatedStore);
});

export const storeRouter = router;