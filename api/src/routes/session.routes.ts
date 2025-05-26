import {
    Router,
    Request,
    Response
} from 'express';

import {
    validateAccessToken
} from '../middleware/authenticated';

import {
    getSession
} from '../services/session.service';

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
    const session = await getSession(token);

    return response.json(session);
});

export const sessionRouter = router;