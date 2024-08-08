

// drop table if exists sys_dept;
// create table sys_dept (
//   dept_id           bigint(20)      not null auto_increment    comment '部门id',
//   parent_id         bigint(20)      default 0                  comment '父部门id',
//   ancestors         varchar(50)     default ''                 comment '祖级列表',
//   dept_name         varchar(30)     default ''                 comment '部门名称',
//   order_num         int(4)          default 0                  comment '显示顺序',
//   leader            varchar(20)     default null               comment '负责人',
//   phone             varchar(11)     default null               comment '联系电话',
//   email             varchar(50)     default null               comment '邮箱',
//   status            char(1)         default '0'                comment '部门状态（0正常 1停用）',
//   del_flag          char(1)         default '0'                comment '删除标志（0代表存在 2代表删除）',
//   create_by         varchar(64)     default ''                 comment '创建者',
//   create_time 	    datetime                                   comment '创建时间',
//   update_by         varchar(64)     default ''                 comment '更新者',
//   update_time       datetime                                   comment '更新时间',
//   primary key (dept_id)
// ) engine=innodb auto_increment=200 comment = '部门表';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sys_dept')
export class Dept {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'dept_id' })
    deptId: number;

    @Column({ type: 'bigint', name: 'parent_id', default: 0, comment: '父部门id' })
    parentId: number;

    @Column({ type: 'varchar', length: 50, name: 'ancestors', default: '', comment: '祖级列表' })
    ancestors: string;

    @Column({ type: 'varchar', length: 30, name: 'dept_name', default: '', comment: '部门名称' })
    deptName: string;

    @Column({ type: 'int', name: 'order_num', default: 0, comment: '显示顺序' })
    orderNum: number;

    @Column({ type: 'varchar', length: 20, name: 'leader', default: null, comment: '负责人' })
    leader: string;

    @Column({ type: 'varchar', length: 11, name: 'phone', default: null, comment: '联系电话' })
    phone: string;

    @Column({ type: 'varchar', length: 50, name: 'email', default: null, comment: '邮箱' })
    email: string;

    @Column({ type: 'char', length: 1, name: 'status', default: '0', comment: '部门状态（0正常 1停用）' })
    status: string;

    @Column({ type: 'char', length: 1, name: 'del_flag', default: '0', comment: '删除标志（0代表存在 2代表删除）' })
    delFlag: string;

    @Column({ type: 'varchar', length: 64, name: 'create_by', default: '', comment: '创建者' })
    createBy: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time' })
    createTime: Date;

    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
    update_by: string;
  
    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
    update_time: Date | null;
  
}