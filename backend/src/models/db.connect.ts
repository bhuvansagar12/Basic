import { Sequelize } from 'sequelize-typescript';
import {student} from './student';

export const connecttodb = async() => {
    try {
        const connection = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            username: 'root',
            password: 'password12',
            database: 'user',
            models: [student]
        });
        await connection.sync();
    } catch (error) {
         console.log(error);
    }

}