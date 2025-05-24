import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

export function authenticate(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies.access_token;
    if (!token) {
        return response.status(401).json({ message: 'Not authenticated' });
    };

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        (request as any).user = decoded;
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return response.status(401).json({ message: 'Token expired' });
        };
        return response.status(401).json({ message: 'Invalid token' });
    };
};

export function validateAccessToken(request: Request) {
    const token = request.cookies.access_token;
    if (!token) {
        throw new Error('No access token');
    };

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        };
        throw new Error('Invalid token');
    };
};