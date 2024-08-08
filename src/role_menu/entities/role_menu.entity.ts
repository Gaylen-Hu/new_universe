// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// @Entity('sys_post')
// export class UserPost {}

// drop table if exists sys_role_menu;
// create table sys_role_menu (
//   role_id   bigint(20) not null comment '角色ID',
//   menu_id   bigint(20) not null comment '菜单ID',
//   primary key(role_id, menu_id)
// ) engine=innodb comment = '角色和菜单关联表';

import { Entity, PrimaryGeneratedColumn, PrimaryColumn,Column } from 'typeorm';

@Entity('sys_role_menu')

export class RoleMenu {
    @PrimaryColumn({ type: 'bigint', name: 'role_id', comment: '角色ID' }) // Define roleId separately
    roleId: number;

    @PrimaryColumn({ type: 'bigint', name: 'menu_id', comment: '菜单ID' }) // Define menuId separately
    menuId: number;
}