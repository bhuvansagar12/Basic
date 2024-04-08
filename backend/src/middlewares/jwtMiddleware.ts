import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    token?: string;
    user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.token = token;
            req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
