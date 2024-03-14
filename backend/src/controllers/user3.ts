import express from 'express';
import { student } from '../models/student';

export const getAllUserTask3 = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   

   const inf = await student.findAll({
        where: { class : "10" }
    });

    return res.send(inf).status(200);
    
}