import express, { Request, Response, NextFunction } from 'express';
import { allStudents } from '../controllers/user';
import { allNames } from '../controllers/user';
import { allFromClass } from '../controllers/user';
import { addStudent } from '../controllers/user';
import { updateStudent } from '../controllers/user';
import { deleteStudent } from '../controllers/user';
import { allStudentsByClass } from '../controllers/user';
import { dept } from '../controllers/user';
import { studentdept } from '../controllers/user';
import { jwtauth } from '../controllers/user';
import { jwtauthpro } from '../controllers/user';
import { jwtauthlogin } from '../controllers/user';
import { authenticateJWT } from '../middlewares/jwtMiddleware';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.get('/all', allStudents);
userRouter.get('/name', allNames);
userRouter.get('/admission', allFromClass);
userRouter.post('/students', addStudent);
userRouter.patch('/students/:id', updateStudent);
userRouter.delete('/students/:id', deleteStudent);
userRouter.get('/class', allStudentsByClass);
userRouter.get('/department', dept);
userRouter.get('/department/:id', studentdept);
userRouter.get('/api', jwtauth);
userRouter.get('/api/protected', ensureToken, jwtauthpro);
userRouter.post('/api/login2', jwtauthlogin);


interface CustomRequest extends Request {
    token?: string;
}

function ensureToken(req: CustomRequest, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


export const protectedRoute = (req: Request & { token?: string }, res: Response, next: NextFunction) => {
    res.json({ message: 'You accessed a protected route!' });
};

userRouter.get('/protected', authenticateJWT, protectedRoute);

export const login = (req: Request, res: Response, next: NextFunction) => {
  
    const username = req.body.username;
    const password = req.body.password;

  
    if (username === 'admin' && password === 'password') {
        const user = { username: 'admin' };
        const accessToken = jwt.sign(user, 'your_secret_key');
        res.json({ accessToken });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

export default userRouter;
