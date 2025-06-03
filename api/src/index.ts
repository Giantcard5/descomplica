import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import corsOptions from './config/corsOptions';
import mainRouter from './routes/routes';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', mainRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;