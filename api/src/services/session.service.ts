import { 
    verify 
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../utils/prismaClient';

export class SessionService extends PrismaClientSingleton {
    private static instance: SessionService;

    private constructor() {
        super();
    }
    
    static getInstance(): SessionService {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }
    
    async get(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const user = await this.prisma.user.findUnique({
            where: { id: decoded.sub as string },
            include: { auth: true }
        });
    
        if (!user || !user.auth) {
            throw new Error('User/Auth not found');
        };
    
        const sessions = await this.prisma.loginSession.findMany({
            where: {
                authId: user.auth.id
            }
        });
    
        return {
            login_sessions: sessions
        };
    }
}

export const sessionService = SessionService.getInstance();