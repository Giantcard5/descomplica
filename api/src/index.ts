import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import { authRouter } from './routes/auth.routes';
import { tokenRouter } from './routes/token.routes';
import { settingsRouter } from './routes/settings.routes';
import { profileRouter } from './routes/profile.routes';
import { sessionRouter } from './routes/session.routes';
import { storeRouter } from './routes/store.routes';
import { receiptRouter } from './routes/receipt.routes';

dotenv.config();

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3000/',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        };
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400 // 24 hours
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

app.use('/api/receipts', receiptRouter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/token', tokenRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/session', sessionRouter);
app.use('/api/store', storeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;