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
import { allUsers } from '../controllers/user';
import { verifyToken } from '../middlewares/authorization';
import { signup } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/student/all', allStudents);
userRouter.get('/student/name', allNames);
userRouter.get('/student/admission',verifyToken, allFromClass);
userRouter.post('/student/students',verifyToken, addStudent);
userRouter.patch('/students/:id',verifyToken, updateStudent);
userRouter.delete('/students/:id', verifyToken,deleteStudent);
userRouter.get('/class',verifyToken, allStudentsByClass);
userRouter.get('/department', verifyToken,dept);
userRouter.get('/department/:id',verifyToken, studentdept);
userRouter.get('/users', allUsers);
userRouter.post('/signup',signup);
export default userRouter;


// userRouter.get('/api', jwtauth);
// // userRouter.get('/api/protected', ensureToken, jwtauthpro);
// userRouter.post('/api/login2', jwtauthlogin);


// interface CustomRequest extends Request {
//     token?: string;
// }

// function ensureToken(req: CustomRequest, res: Response, next: NextFunction) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }


// export const protectedRoute = (req: Request & { token?: string }, res: Response, next: NextFunction) => {
//     res.json({ message: 'You accessed a protected route!' });
// };

// // userRouter.get('/protected', authenticateJWT, protectedRoute);

// export const login = (req: Request, res: Response, next: NextFunction) => {
  
//     const username = req.body.username;
//     const password = req.body.password;

//     if (username === 'admin' && password === 'password') {
//         const user = { username: 'admin' };
//         const accessToken = jwt.sign(user, 'your_secret_key');
//         res.json({ accessToken });
//     } else {
//         res.status(401).json({ error: 'Invalid credentials' });
//     }
// };

