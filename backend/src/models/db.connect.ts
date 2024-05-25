import { Sequelize } from 'sequelize-typescript';
import {student} from './student';
import { department } from './departments';
import { users } from './users';

export const connecttodb = async() => {
    try {
        const connection = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            username: 'root',
            password: 'password12',
            database: 'user',
            models: [student,department,users]
        });
        await connection.sync();
    } catch (error) {
         console.log(error);
    }

}