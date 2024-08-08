import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sys_menu')
export class Menu {

  @PrimaryGeneratedColumn({ type: 'bigint', comment: '菜单ID' })
  menu_id: number;

  @Column({ type: 'bigint', nullable: false, default: 0, comment: '父菜单ID' })
  parent_id: number;

  @Column({ type: 'int', nullable: false, default: 0, comment: '显示顺序' })
  order_num: number;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '组件路径' })
  component: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由参数' })
  query: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: '', comment: '路由名称' })
  route_name: string;

  @Column({ type: 'int', nullable: false, default: 1, comment: '是否为外链（0是 1否）' })
  is_frame: number;

  @Column({ type: 'int', nullable: false, default: 0, comment: '是否缓存（0缓存 1不缓存）' })
  is_cache: number;

  @Column({ type: 'char', length: 1, nullable: false, default: '', comment: '菜单类型（M目录 C菜单 F按钮）' })
  menu_type: string;

  @Column({ type: 'char', length: 1, nullable: false, default: '0', comment: '菜单状态（0显示 1隐藏）' })
  visible: string;

  @Column({ type: 'char', length: 1, nullable: false, default: '0', comment: '菜单状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '权限标识' })
  perms: string;

  @Column({ type: 'varchar', length: 100, nullable: false, default: '#', comment: '菜单图标' })
  icon: string;

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '创建者' })
  create_by: string;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
  create_time: Date;

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
  update_by: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
  update_time: Date | null;

  @Column({ type: 'varchar', length: 500, nullable: true, default: '', comment: '备注' })
  remark: string;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '菜单名称' })
  menu_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '路由地址' })
  path: string;
}





// - ----------------------------
// -- 5、菜单权限表
// -- ----------------------------
// drop table if exists sys_menu;
// create table sys_menu (
//   menu_id           bigint(20)      not null auto_increment    comment '菜单ID',
//   menu_name         varchar(50)     not null                   comment '菜单名称',
//   parent_id         bigint(20)      default 0                  comment '父菜单ID',
//   order_num         int(4)          default 0                  comment '显示顺序',
//   path              varchar(200)    default ''                 comment '路由地址',
//   component         varchar(255)    default null               comment '组件路径',
//   query             varchar(255)    default null               comment '路由参数',
//   route_name        varchar(50)     default ''                 comment '路由名称',
//   is_frame          int(1)          default 1                  comment '是否为外链（0是 1否）',
//   is_cache          int(1)          default 0                  comment '是否缓存（0缓存 1不缓存）',
//   menu_type         char(1)         default ''                 comment '菜单类型（M目录 C菜单 F按钮）',
//   visible           char(1)         default 0                  comment '菜单状态（0显示 1隐藏）',
//   status            char(1)         default 0                  comment '菜单状态（0正常 1停用）',
//   perms             varchar(100)    default null               comment '权限标识',
//   icon              varchar(100)    default '#'                comment '菜单图标',
//   create_by         varchar(64)     default ''                 comment '创建者',
//   create_time       datetime                                   comment '创建时间',
//   update_by         varchar(64)     default ''                 comment '更新者',
//   update_time       datetime                                   comment '更新时间',
//   remark            varchar(500)    default ''                 comment '备注',
//   primary key (menu_id)
// ) engine=innodb auto_increment=2000 comment = '菜单权限表';