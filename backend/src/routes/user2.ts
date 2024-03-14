import express from 'express';
import {getAllUserTask} from '../controllers/user';
import { getAllUserTask2 } from '../controllers/user2';
const userRouter = express.Router();

userRouter.get('/name',getAllUserTask2);

export default userRouter;