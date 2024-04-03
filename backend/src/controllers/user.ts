import express from 'express';
import { student } from '../models/student';
import { department } from '../models/departments';

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
        //console.log("Error Occured:", error);
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
            attributes: ["nae"]
        });
        return res.send(data).status(200);
    } catch (error) {
        //console.log(error);
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
        const inf = await student.findAll({
            where: { class: "10" }
        });
        return res.send(inf).status(200);
    } catch (error) {
        //console.log(error);
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
        const inf = await student.create(newStudent)
        return res.send(inf).status(200);
    } catch (error) {
        // console.log(error);
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
        const newdata = await student.update(newStudent, { where: { studentId: req.params.id } })
        const updateddata = await student.findOne({ where: { studentId: req.params.id } })
        // console.log(updateddata)
        return res.send(updateddata).status(200);
    } catch (error) {
        // console.log(error);
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
        await student.destroy({ where: { studentId: req.params.id } })
        const deleteddata = await student.findOne({ where: { studentId: req.params.id } })
        // console.log(deleteddata)
        return res.send(deleteddata).status(200);
    } catch (error) {
        // console.log(error);
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

        // Return the grouped data
        return res.send([studentsByClass]).status(200);
    } catch (error) {
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
        return res.send(data).status(200);
    } catch (error) {
        //console.log("Error Occured:", error);
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

return res.status(200).json([responseData]);
    } catch (error) {
    next(error);
}
}

