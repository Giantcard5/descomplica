import {
    Router,
    Request,
    Response
} from 'express';

import {
    validateAccessToken
} from '../../middleware/authenticated';

import { rewardsService } from '../../services/rewards/rewards.service';

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
    
    const rewards = await rewardsService.getRewards(request.cookies.access_token);

    return response.json(rewards);
});

router.post('/redeem', async (request: Request, response: Response) => {
    try {
        validateAccessToken(request);
    } catch (error: any) {
        if (error.message === 'No access token') {
            return response.status(401).json({ message: 'Unauthorized' });
        };
    };

    await rewardsService.redeemReward(request.body.rewardId, request.cookies.access_token);

    return response.status(200).json({ message: 'Reward redeemed successfully' });
});

export const rewardsRouter = router;