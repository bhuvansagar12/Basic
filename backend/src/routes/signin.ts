import express from 'express';
import { signin } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/auth/signin', signin);
export default authRouter;