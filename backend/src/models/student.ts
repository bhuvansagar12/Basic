import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class student extends Model {
    @PrimaryKey
    @Column
    studentId: number;

    @Column
    name: string;

    @Column
    class: string;

    @Column
    section: string;

    @Column
    dob: Date;

}
