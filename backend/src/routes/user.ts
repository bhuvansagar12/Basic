import express from 'express';
import {allStudents} from '../controllers/user';
import {allNames} from '../controllers/user';
import {allFromClass} from '../controllers/user';
import {addStudent} from '../controllers/user';
import {updateStudent} from '../controllers/user';
import {deleteStudent} from '../controllers/user';
import {allStudentsByClass} from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/all',allStudents);
userRouter.get('/name',allNames);
userRouter.get('/admission',allFromClass);
userRouter.post('/students',addStudent);
userRouter.patch('/students/:id',updateStudent);
userRouter.delete('/students/:id',deleteStudent);
userRouter.get('/class',allStudentsByClass);


export default userRouter;