import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Enum' })
export class EnumPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    value.forEach(enumMember => {
      const isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    });
    return keys;
  }
}
