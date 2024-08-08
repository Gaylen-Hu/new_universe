import { Entity, PrimaryGeneratedColumn,PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('sys_user_post')
export class UserPost { 
    @PrimaryColumn({ type: 'bigint', name: 'user_id' })
    userId: number;

    @PrimaryColumn({ type: 'bigint', name: 'post_id', comment: '岗位ID' })
    postId: number;
}
// -- ----------------------------
// -- 9、用户与岗位关联表  用户1-N岗位
// -- ----------------------------
// drop table if exists sys_user_post;
// create table sys_user_post
// (
//   user_id   bigint(20) not null comment '用户ID',
//   post_id   bigint(20) not null comment '岗位ID',
//   primary key (user_id, post_id)
// ) engine=innodb comment = '用户与岗位关联表';