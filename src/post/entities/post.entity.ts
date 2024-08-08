// export class Post {}
// drop table if exists sys_post;
// create table sys_post
// (
//   post_id       bigint(20)      not null auto_increment    comment '岗位ID',
//   post_code     varchar(64)     not null                   comment '岗位编码',
//   post_name     varchar(50)     not null                   comment '岗位名称',
//   post_sort     int(4)          not null                   comment '显示顺序',
//   status        char(1)         not null                   comment '状态（0正常 1停用）',
//   create_by     varchar(64)     default ''                 comment '创建者',
//   create_time   datetime                                   comment '创建时间',
//   update_by     varchar(64)     default ''			       comment '更新者',
//   update_time   datetime                                   comment '更新时间',
//   remark        varchar(500)    default null               comment '备注',
//   primary key (post_id)
// ) engine=innodb comment = '岗位信息表';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('sys_post')
export class Post {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'post_id' })
    postId: number;

    @Column({ type: 'varchar', length: 64, name: 'post_code', comment: '岗位编码' })
    postCode: string;

    @Column({ type: 'varchar', length: 50, name: 'post_name', comment: '岗位名称' })
    postName: string;

    @Column({ type: 'int', name: 'post_sort', comment: '显示顺序' })
    postSort: number;

    @Column({ type: 'char', length: 1, name: 'status', comment: '状态（0正常 1停用）' })
    status: string;

    @Column({ type: 'varchar', length: 64, name: 'create_by', default: '', comment: '创建者' })
    createBy: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time' })
    createTime: Date;

    @Column({ type: 'varchar', length: 64, nullable: true, name: 'update_by', default: '', comment: '更新者' })
    updateBy: string;



    @UpdateDateColumn({ type: 'datetime',  nullable: true, name: 'update_time', comment: '更新时间' })
    update_time: Date | null;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'remark', default: null, comment: '备注' })
    remark: string;
}