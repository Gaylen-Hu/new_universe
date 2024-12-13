import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CamelCasePipe implements PipeTransform {
  transform(value: any) {
    if (Array.isArray(value)) {
      return value.map(item => this.toCamelCase(item));
    }
    return this.toCamelCase(value);
  }

  private toCamelCase(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
      const newKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
      newObj[newKey] = obj[key];
    }
    return newObj;
  }
}
