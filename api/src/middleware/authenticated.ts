import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
}