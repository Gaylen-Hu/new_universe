import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sys_user')
export class SysUser {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
    userId: number;

    @Column({ type: 'bigint', name: 'dept_id', nullable: true, comment: '部门ID' })
    deptId: number;

    @Column({ type: 'varchar', length: 30, name: 'user_name', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: false, comment: '用户账号' })
    userName: string;

    @Column({ type: 'varchar', length: 30, name: 'nick_name', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: false, comment: '用户昵称' })
    nickName: string;

    @Column({ type: 'varchar', length: 2, name: 'user_type', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '00', comment: '用户类型（00系统用户）' })
    userType: string;

    @Column({ type: 'varchar', length: 50, name: 'email', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '用户邮箱' })
    email: string;

    @Column({ type: 'varchar', length: 11, name: 'phonenumber', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '手机号码' })
    phonenumber: string;

    @Column({ type: 'char', length: 1, name: 'sex', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '0', comment: '用户性别（0男 1女 2未知）' })
    sex: string;

    @Column({ type: 'varchar', length: 100, name: 'avatar', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '头像地址' })
    avatar: string;

    @Column({ type: 'varchar', length: 100, name: 'password', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '密码' })
    password: string;

    @Column({ type: 'char', length: 1, name: 'status', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '0', comment: '帐号状态（0正常 1停用）' })
    status: string;

    @Column({ type: 'char', length: 1, name: 'del_flag', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '0', comment: '删除标志（0代表存在 2代表删除）' })
    delFlag: string;

    @Column({ type: 'varchar', length: 128, name: 'login_ip', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '最后登录IP' })
    loginIp: string;

    @Column({ type: 'datetime', name: 'login_date', nullable: true, comment: '最后登录时间' })
    loginDate: Date;

    @Column({ type: 'varchar', length: 64, name: 'create_by', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', default: '', comment: '创建者' })
    createBy: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time', comment: '创建时间' })
    createTime: Date;
    
    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
    update_by: string;
  
    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
    update_time: Date | null;

    @Column({ type: 'varchar', length: 500, name: 'remark', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: true, comment: '备注' })
    remark: string;
}
