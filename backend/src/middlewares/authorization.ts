import jwt from 'jsonwebtoken';
import express from 'express';

const secretKey = 'secret-key';
const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmh1dmFuIiwiaWF0IjoxNzE4MDIyNjc2LCJleHAiOjE3MTgxMDkwNzZ9.sRG5gNViXGVBpmblebyde08MJ-afFf1ymPsV1xrRy4k'; // Replace with your actual hardcoded token

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Use the hardcoded token instead of the one from the headers
    const token = hardcodedToken;
    
    if (!token) {
        return res.status(403).send({
            message: 'No Token is provided'
        });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).send({
                message: 'Unauthorized'
            });
        }
        req['userId'] = decoded.id;
        next();
    });
}












// import jwt from 'jsonwebtoken';
// import express from 'express';

// const secretKey = 'secret-key';

// export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     // let token = req.headers['x-access-token'];
//     let token = req.headers['authorization'];
    
//     const bearer = token.split(" ");
//      const bearerToken = token[1];

//     if (!bearerToken) {
//         return res.status(403).send({
//             message: 'No Token is provided'
//         });
//     }
//     jwt.verify(bearerToken, secretKey, (err: any, decoded: any) => {
//         if (err)
//             return res.status(403).send({
//                 message: 'Unauthorized'
//             });
//         req['userId'] = decoded.id;
//         next();
//     });
// }