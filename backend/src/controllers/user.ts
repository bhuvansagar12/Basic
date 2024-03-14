import express from 'express';
import { student } from '../models/student';

export const getAllUserTask = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const data = await student.findAll({
        order: ["class"]
    });

   
    return res.send(data).status(200);
    
}