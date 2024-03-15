import express from 'express';
import { student } from '../models/student';

export const getAllUserTask = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const data = await student.findAll({
        order: ["dob"]
    });

   
    return res.send(data).status(200);
    
}

export const getAllUserTask2 = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    

    const data = await student.findAll({
        attributes:["name"]
    });

  

    return res.send(data).status(200);
    
}

export const getAllUserTask3 = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   

    const inf = await student.findAll({
         where: { class : "10" }
     });
 
     return res.send(inf).status(200);
     
 }