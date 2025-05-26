import { 
    verify 
} from 'jsonwebtoken';

import {
    prisma
} from '../utils/prismaClient';

export const getSession = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const user = await prisma.user.findUnique({
        where: { id: decoded.sub as string },
        include: { auth: true }
    });

    if (!user || !user.auth) {
        throw new Error('User/Auth not found');
    };

    const sessions = await prisma.loginSession.findMany({
        where: {
            authId: user.auth.id
        }
    });

    return {
        login_sessions: sessions
    };
};