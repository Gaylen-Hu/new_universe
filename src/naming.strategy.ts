// src/naming.strategy.ts
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { camelCase } from 'lodash';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  // 自定义数据库表字段命名方式
  columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
    const columnName = customName ? customName : propertyName;
    return camelCase(embeddedPrefixes.concat(columnName).join('_')); // 使用 camelCase 将字段转换为驼峰
  }

  // 自定义数据库表命名方式（可选）
  tableName(className: string, customName: string | undefined): string {
    return customName ? customName : className;
  }
}
