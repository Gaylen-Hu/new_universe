import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { UserRole } from '../../user_role/entities/user_role.entity';
// drop table if exists sys_role;
// create table sys_role (
//   role_id              bigint(20)      not null auto_increment    comment '角色ID',
//   role_name            varchar(30)     not null                   comment '角色名称',
//   role_key             varchar(100)    not null                   comment '角色权限字符串',
//   role_sort            int(4)          not null                   comment '显示顺序',
//   data_scope           char(1)         default '1'                comment '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
//   menu_check_strictly  tinyint(1)      default 1                  comment '菜单树选择项是否关联显示',
//   dept_check_strictly  tinyint(1)      default 1                  comment '部门树选择项是否关联显示',
//   status               char(1)         not null                   comment '角色状态（0正常 1停用）',
//   del_flag             char(1)         default '0'                comment '删除标志（0代表存在 2代表删除）',
//   create_by            varchar(64)     default ''                 comment '创建者',
//   create_time          datetime                                   comment '创建时间',
//   update_by            varchar(64)     default ''                 comment '更新者',
//   update_time          datetime                                   comment '更新时间',
//   remark               varchar(500)    default null               comment '备注',
//   primary key (role_id)
// ) engine=innodb auto_increment=100 comment = '角色信息表';
@Entity('sys_role')
export class Role {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'role_id' })
    roleId: number;

    @Column({ type: 'varchar', length: 30, name: 'role_name', comment: '角色名称' })
    roleName: string;

    @Column({ type: 'varchar', length: 100, name: 'role_key', comment: '角色权限字符串' })
    roleKey: string;

    @Column({ type: 'int', name: 'role_sort', comment: '显示顺序' })
    roleSort: number;

    @Column({ type: 'char', length: 1, name: 'data_scope', default: '1', comment: '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）' })
    dataScope: string;

    @Column({ type: 'tinyint', name: 'menu_check_strictly', default: 1, comment: '菜单树选择项是否关联显示' })
    menuCheckStrictly: number;

    @Column({ type: 'tinyint', name: 'dept_check_strictly', default: 1, comment: '部门树选择项是否关联显示' })
    deptCheckStrictly: number;

    @Column({ type: 'char', length: 1, name: 'status', comment: '角色状态（0正常 1停用）' })
    status: string;

    @Column({ type: 'char', length: 1, name: 'del_flag', default: '0', comment: '删除标志（0代表存在 2代表删除）' })
    delFlag: string;

    @Column({ type: 'varchar', length: 64, name: 'create_by', default: '', comment: '创建者' })
    createBy: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time' })
    createTime: Date;

    @Column({ type: 'varchar', length: 64, nullable: true, name: 'update_by', default: '', comment: '更新者' })
    updateBy: string;

    @UpdateDateColumn({ type: 'datetime',nullable: true, name: 'update_time' })
    updateTime: Date | null;

    @Column({ type: 'varchar', length: 500, name: 'remark', default: null, comment: '备注' })
    remark: string;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}
