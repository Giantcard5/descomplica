import { Router } from 'express';

import { authRouter } from './auth/auth.routes';
import { tokenRouter } from './auth/token.routes';
import { sessionRouter } from './auth/session.routes';

import { settingsRouter } from './settings/settings.routes';
import { profileRouter } from './settings/profile.routes';

import { storeRouter } from './store/store.routes';

import { receiptRouter } from './receipt/receipt.routes';

import { chatbotRouter } from './chatbot/chatbot.routes';

import { rewardsRouter } from './rewards/rewards.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/session', sessionRouter);

router.use('/settings', settingsRouter);
router.use('/profile', profileRouter);

router.use('/store', storeRouter);

router.use('/receipts', receiptRouter);

router.use('/chatbot', chatbotRouter);

router.use('/rewards', rewardsRouter);

export default router;