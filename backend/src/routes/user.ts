import express from 'express';
import {getAllUserTask} from '../controllers/user';
const userRouter = express.Router();

userRouter.get('/all',getAllUserTask);

export default userRouter;