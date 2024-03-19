import express from 'express';
import {allStudents} from '../controllers/user';
import {allNames} from '../controllers/user';
import {allFromClass} from '../controllers/user';
import {addStudent} from '../controllers/user';
import {updateStudent} from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/all',allStudents);
userRouter.get('/name',allNames);
userRouter.get('/admission',allFromClass);
userRouter.post('/students',addStudent);
userRouter.patch('/students/:id',updateStudent);

export default userRouter;