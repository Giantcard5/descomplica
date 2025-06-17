import {
    Router,
    Request,
    Response
} from 'express';

import {
    validateAccessToken
} from '../../middleware/authenticated';

import {
    chatbotService 
} from '../../services/chatbot/chatbot.service';

const router = Router();

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

    const serviceResponse = await chatbotService.getChatbotResponse(request.body);

    return response.status(200).json(serviceResponse);
});

export const chatbotRouter = router;