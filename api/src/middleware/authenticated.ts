import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

export const middlewareAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: 'Token is required'
        });
    };

    const token = authHeader.replace('Bearer ', '').trim();

    try {
        verify(token, process.env.JWT_SECRET as string);

        return next();
    } catch (error) {
        return response.status(401).json({
            message: 'Invalid token'
        });
    };
};