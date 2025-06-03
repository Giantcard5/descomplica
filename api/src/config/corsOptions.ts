import { 
    CorsOptions 
} from 'cors';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3000/',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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
    maxAge: 86400
};

export default corsOptions;
