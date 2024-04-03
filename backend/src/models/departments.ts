import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class department extends Model {
    @PrimaryKey
    @Column
    departmentId: number;

    @Column
    departmentName: string;

    @Column
    departmentFlag: string;

    @Column
    departmentHod: string;
}
