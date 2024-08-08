import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('sys_dict_data')

export class DictDatum {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'dict_code' })
  dictCode: number;

  @Column({ type: 'int', name: 'dict_sort', default: 0, comment: '字典排序' })
  dictSort: number;

  @Column({ type: 'varchar', length: 100, name: 'dict_label', default: '', comment: '字典标签' })
  dictLabel: string;

  @Column({ type: 'varchar', length: 100, name: 'dict_value', default: '', comment: '字典键值' })
  dictValue: string;

  @Column({ type: 'varchar', length: 100, name: 'dict_type', default: '', comment: '字典类型' })
  dictType: string;

  @Column({ type: 'varchar', length: 100, name: 'css_class', default: null, comment: '样式属性（其他样式扩展）' })
  cssClass: string;

  @Column({ type: 'varchar', length: 100, name: 'list_class', default: null, comment: '表格回显样式' })
  listClass: string;

  @Column({ type: 'char', length: 1, name: 'is_default', default: 'N', comment: '是否默认（Y是 N否）' })
  isDefault: string;

  @Column({ type: 'char', length: 1, name: 'status', default: '0', comment: '状态（0正常 1停用）' })
  status: string;

  @Column({ type: 'varchar', length: 64, name: 'create_by', default: '', comment: '创建者' })
  createBy: string;

  @CreateDateColumn({ type: 'datetime', name: 'create_time' })
  createTime: Date;

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
  update_by: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
  update_time: Date | null;


  @Column({ type: 'varchar', length: 500, name: 'remark', default: null, comment: '备注' })
  remark
}
