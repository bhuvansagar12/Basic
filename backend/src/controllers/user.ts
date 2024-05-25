import express, { response } from 'express';

import { student } from '../models/student';
import { department } from '../models/departments';
import { Logger } from '../../log/logger';
import { users } from '../models/users';

const link='http://localhost:8080'

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
            order: ["class"]
        });
        
        Logger.info({
            data : data.map(student => student.dataValues),
            message:'displayed students',
            Status: 200,
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
        });
       
        return res.send(data).status(200);
        
    } catch (error) {
        console.log("Error Occured:", error);
        Logger.error({
            error: error.message
        });
        error.status=500;
        next(error);
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
        
        Logger.info({
            data : data.map(student => student.dataValues),
            Status: 200,
            message:'displayed all student names',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        return res.send(data).status(200);
    } catch (error) {
        //console.log(error);
        Logger.error({
            error: error.message
        });
        next(error);
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
        const data = await student.findAll({
            where: { class: "10" }
        });
        Logger.info({
            data : data.map(student => student.dataValues),
            Status: 200,
            message:'displayed student names from speicified class',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });
        
        return res.send(data).status(200);
    } catch (error) {
        //console.log(error);
        Logger.error({
            error: error.message
        });
       next(error);
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
        const data = await student.create(newStudent)

        Logger.info({
            //data : data.map(student => student.dataValues),
            newData: newStudent,
            Status: 200,
            message:'added new student details',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        return res.send(data).status(200);
    } catch (error) {
        // console.log(error);
        Logger.error({
            error: error.message
        });
        next(error);
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
        const olddata = await student.findOne({ where: { studentId: req.params.id } })
        const newdata = await student.update(newStudent, { where: { studentId: req.params.id } })
        const updateddata = await student.findOne({ where: { studentId: req.params.id } })

        Logger.info({
            oldData: olddata.dataValues,
            newData: updateddata.dataValues,
            Status: 200,
            message: 'added new student details',
            url: `[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        return res.send(updateddata).status(200);
    } catch (error) {
        // console.log(error);
        Logger.error({
            error: error.message
        });
        next(error);
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
        const deleteddata = await student.findOne({ where: { studentId: req.params.id } })
        await student.destroy({ where: { studentId: req.params.id } })
        //const deleteddata = await student.findOne({ where: { studentId: req.params.id } })
        // console.log(deleteddata)

        Logger.info({
            //data : data.map(student => student.dataValues),
            deletedData: deleteddata.dataValues,
            message:'deleted existing student details',
            Status: 200,
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });
       

        return res.send(deleteddata).status(200);
    } catch (error) {
        // console.log(error);
        Logger.error({
            error: error.message
        });
        next(error);
    }
}

/**
 * this is function that gives all the students by class.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const allStudentsByClass = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Find all student records
        const students = await student.findAll();

        // Create an object to store students sorted by class
        const studentsByClass: { [className: string]: any } = {};


        // Group students by classs
        students.forEach(student => {
            if (!studentsByClass[student.class]) {
                studentsByClass[student.class] = [];
            }
            studentsByClass[student.class].push(student);
        });
        Logger.info({
            data : studentsByClass,
            Status: 200,
            message:'displayed student from the class',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        // Return the grouped data
        return res.send([studentsByClass]).status(200);
    } catch (error) {
        Logger.error({
            error: error.message
        });
        next(error);
    }
}

/**
 * this function gives all the departments.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const dept = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const data = await department.findAll({
        });

        Logger.info({
            data : data.map(department => department.dataValues),
            message:'displayed all departments',
            Status: 200,
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        return res.send(data).status(200);
    } catch (error) {
        //console.log("Error Occured:", error);
        Logger.error({
            error: error.message
        });
        next(error);
    }
}

/**
 * this function gives the info about the student and department based on the ID given by the user.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const studentdept = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const students = await student.findOne({
            where: { studentId: id },
            include: [{ model: department, as: 'department' }]
        });

        if (!students) {
            return res.status(404).json({ error: "Student not found" });
        }

        const responseData = {
            studentId: students.studentId,
            name: students.name,
            class: students.class,
            section: students.section,
            dob: students.dob,
            departmentId: students.departmentId,
            department: {
                departmentId: students.department.departmentId,
                departmentName: students.department.departmentName,
                departmentFlag: students.department.departmentFlag,
                departmentHod: students.department.departmentHod
            }
        };

        Logger.info({
            data : responseData,
            Status: 200,
            message:'displayed student and deartment details',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

return res.status(200).json([responseData]);
    } catch (error) {
        Logger.error({
            error: error.message
        });
    next(error);
}
}

/**
 * this function that returns all the users.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const allUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const data = await users.findAll({
        });
        
        Logger.info({
            data : data.map(users => users.dataValues),
            message:'displayed all the Users',
            Status: 200,
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
        });
       
        return res.send(data).status(200);
        
    } catch (error) {
        //console.log("Error Occured:", error);
        Logger.error({
            error: error.message
        });

        next(error);
    }
}

export const signup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { userId, userName, password } = req.body;
        console.log("entered",userName, req.body);
        const existingUser = await users.findOne({ where: { userName } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = await users.create({userId, userName, password });
        res.status(201).json(newUser)
        


        Logger.info({
            //data : data.map(student => student.dataValues),
            newData: newUser,
            Status: 200,
            message:'New user signedup',
            url:`[${req.method}] Request received for URL: ${link}${req.originalUrl}`
            
        });

        return res.send(newUser).status(200);
    } catch (error) {
        // console.log(error);
        Logger.error({
            error: error.message
        });
        next(error);
    }
}