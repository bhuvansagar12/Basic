import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { department } from './departments';

@Table
export class student extends Model {
    static find(arg0: (user: any) => boolean) {
        throw new Error('Method not implemented.');
    }
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

    @ForeignKey(() => department)
    @Column
    departmentId: number;

    @BelongsTo(() => department)
    department: department;

}
