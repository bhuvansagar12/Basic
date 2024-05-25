import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class users extends Model {
    @PrimaryKey
    @Column
    userId: number;

    @Column
    userName: string;

    @Column
    password: string;

}
