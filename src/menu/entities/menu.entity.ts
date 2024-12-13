import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('sys_menu')
export class Menu {
 
  @PrimaryGeneratedColumn({  type: 'bigint', comment: '菜单ID' })
  @Expose({ name: 'menuId' })  
  menu_id: number;

  @Column({ type: 'bigint', nullable: false, default: 0, comment: '父菜单ID' })
  @Expose({ name: 'parentId' })
  parent_id: number;

  @Column({ type: 'int', nullable: false, default: 0, comment: '显示顺序' })
  @Expose({ name: 'orderNum' })
  order_num: number;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '组件路径' })
  @Expose({ name: 'component' })
  component: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '路由参数' })
  @Expose({ name: 'query' })
  query: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: '', comment: '路由名称' })
  @Expose({ name: 'routeName' })
  route_name: string;

  @Column({ type: 'int', nullable: false, default: 1, comment: '是否为外链（0是 1否）' })
  @Expose({ name: 'isFrame' })
  is_frame: number;

  @Column({ type: 'int', nullable: false, default: 0, comment: '是否缓存（0缓存 1不缓存）' })
  @Expose({ name: 'isCache' })
  is_cache: number;

  @Column({ type: 'char', length: 1, nullable: false, default: '', comment: '菜单类型（M目录 C菜单 F按钮）' })
  @Expose({ name: 'menuType' })
  menu_type: string;

  @Column({ type: 'char', length: 1, nullable: false, default: '0', comment: '菜单状态（0显示 1隐藏）' })
  @Expose({ name: 'visible' })
  visible: string;

  @Column({ type: 'char', length: 1, nullable: false, default: '0', comment: '菜单状态（0正常 1停用）' })
  @Expose({ name: 'status' })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '权限标识' })
  @Expose({ name: 'perms' })
  perms: string;

  @Column({ type: 'varchar', length: 100, nullable: false, default: '#', comment: '菜单图标' })
  @Expose({ name: 'icon' })
  icon: string;

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '创建者' })
  @Expose({ name: 'createBy' })
  create_by: string;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
  @Expose({ name: 'createTime' })
  create_time: Date;

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
  @Expose({ name: 'updateBy' })
  update_by: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
  @Expose({ name: 'updateTime' })
  update_time: Date | null;

  @Column({ type: 'varchar', length: 500, nullable: true, default: '', comment: '备注' })
  @Expose({ name: 'remark' })
  remark: string;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '菜单名称' })
  @Expose({ name: 'menuName' })
  menu_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '路由地址' })
  @Expose({ name: 'path' })
  path: string;
}