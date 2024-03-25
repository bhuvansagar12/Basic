import express from 'express';
import { student } from '../models/student';

//get all the data in the table named students and orders according to DOB
/**
 * this is a functon that returns all the students details and order them according to DOB
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const allStudents = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const data = await student.findAll({
            order: ["dob"]
        });
        return res.send(data).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

//get all the students names from the table
/**
 * this is a functon that returns all the student's names.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const allNames = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const data = await student.findAll({
            attributes: ["name"]
        });
        return res.send(data).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

//get all the student details from the table where class is equal to 10
/**
 * this is a functon that returns all the students from a specific class.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const allFromClass = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const inf = await student.findAll({
            where: { class: "10" }
        });
        return res.send(inf).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

 //adds a new entry to the database
 /**
  * this is a functon that adds a new student into record.
  * @param req 
  * @param res 
  * @param next 
  * @returns 
  */
export const addStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const newStudent = req.body;
        const inf = await student.create(newStudent)
        return res.send(inf).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

//update the existing data in the database
/**
 * this is a functon that updates a existing student info.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const updateStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const newStudent = req.body;
        const newdata = await student.update(newStudent, { where: { studentId: req.params.id } })
        const updateddata = await student.findOne({ where: { studentId: req.params.id } })
        // console.log(updateddata)
        return res.send(updateddata).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

//delete the existing data in the database
/**
 * this is function that delete a existing student info.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const deleteStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await student.destroy({ where: { studentId: req.params.id } })
        const deleteddata = await student.findOne({ where: { studentId: req.params.id } })
        // console.log(deleteddata)
        return res.send(deleteddata).status(200);
    } catch (error) {
        return res.send("Error Occured").status(200);
    }
}

export const allStudentsByClass = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Find all student records
        const students = await student.findAll();

        // Create an object to store students sorted by class
        const studentsByClass: { [className: string]: any } = {};


        // Group students by class
        students.forEach(student => {
            if (!studentsByClass[student.class]) {
                studentsByClass[student.class] = [];
            }
            studentsByClass[student.class].push(student);
        });

        // Return the grouped data
        return res.json(studentsByClass).status(200);
    } catch (error) {
        console.error("Error Occurred:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

 