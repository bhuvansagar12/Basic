import express from 'express';
import {getAllUserTask} from '../controllers/user';

import { getAllUserTask2 } from '../controllers/user';
import { getAllUserTask3 } from '../controllers/user';
const userRouter = express.Router();

userRouter.get('/all',getAllUserTask);

userRouter.get('/name',getAllUserTask2);
userRouter.get('/admission',getAllUserTask3);

export default userRouter;