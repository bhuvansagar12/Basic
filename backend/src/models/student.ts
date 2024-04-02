import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { department } from './departments';

@Table
export class student extends Model {
    @PrimaryKey
    @Column
    studentId: number;

    @Column({ type: 'STRING', allowNull: false, validate: { len: [1, 50] } })
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
