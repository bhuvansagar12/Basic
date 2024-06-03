import jwt from 'jsonwebtoken';
import express from 'express';

const secretKey = 'secret-key';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // let token = req.headers['x-access-token'];
    let token = req.headers['authorization'];
    const bearer = token.split(" ");
     const bearerToken = bearer[1];

    if (!bearerToken) {
        return res.status(403).send({
            message: 'No Token is provided'
        });
    }
    jwt.verify(bearerToken, secretKey, (err: any, decoded: any) => {
        if (err)
            return res.status(403).send({
                message: 'Unauthorized'
            });
        req['userId'] = decoded.id;
        next();
    });
}