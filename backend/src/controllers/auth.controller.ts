import jwt from 'jsonwebtoken';
import express from 'express';
import { student } from '../models/student';


let user = {
    username: "Bhuvan",
    password:"admin"
    };

const secretKey = 'secret-key';

export const signin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const users = await student.findAll();
    res.json({
        token:token
    });

    }
    // let user1= student.find((studentdb) => studentdb.name === user.username)
    const token = jwt.sign({ name: user.username}, secretKey, {expiresIn: 86400});