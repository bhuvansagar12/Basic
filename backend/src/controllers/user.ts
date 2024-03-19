import express from 'express';
import { student } from '../models/student';

//get all the data in the table named students and orders according to DOB
export const allStudents = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const data = await student.findAll({
        order: ["dob"]
    });
    return res.send(data).status(200);
}

//get all the students names from the table
export const allNames = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    const data = await student.findAll({
        attributes:["name"]
    });
    return res.send(data).status(200);
}

//get all the student details from the table where class is equal to 10
export const allFromClass = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   
    const inf = await student.findAll({
         where: { class : "10" }
    });
    return res.send(inf).status(200);
 }

 //adds a new entry to the databasse
 export const addStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const newStudent = req.body;
    const inf= await student.create(newStudent)
    return res.send(inf).status(200);
 }

//update the existing data in the database
 export const updateStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const newStudent = req.body;
    const newdata= await student.update(newStudent,{ where :{ studentId : req.params.id }})
    const updateddata= await student.findOne({where : {studentId : req.params.id }})
    console.log(updateddata)
    return res.send(updateddata).status(200); 
 }

 export const deleteStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    await student.destroy({ where :{studentId : req.params.id}})
    const deleteddata= await student.findOne({where : {studentId : req.params.id }})
    console.log(deleteddata)
    return res.send(deleteddata).status(200); 
 }
 