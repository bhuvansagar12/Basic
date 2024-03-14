import express from 'express';
import {getAllUserTask} from '../controllers/user';
import { getAllUserTask2 } from '../controllers/user2';
import { getAllUserTask3 } from '../controllers/user3';
const userRouter = express.Router();

userRouter.get('/admission',getAllUserTask3);

export default userRouter;