import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
@Entity('sys_user_role')
export class UserRole {
    @PrimaryColumn({ type: 'bigint', name: 'user_id', comment: '用户ID' }) // Define userId separately
    userId: number;

    @PrimaryColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' }) // Define roleId separately
    roleId: number;

    @ManyToOne(() => Role, role => role.userRoles) // Assuming you have a corresponding `userRoles` property in Role entity
    @JoinColumn({ name: 'role_id' })
    role: Role;
}


// drop table if exists sys_user_role;
// create table sys_user_role (
//   user_id   bigint(20) not null comment '用户ID',
//   role_id   bigint(20) not null comment '角色ID',
//   primary key(user_id, role_id)
// ) engine=innodb comment = '用户和角色关联表';

