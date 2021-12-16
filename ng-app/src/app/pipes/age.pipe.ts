import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    //2021-12-08T14:00:43
    const d = new Date();

    let num = value.split('-');
    let res = `Year: ${num[0]} Month: ${num[1]}` ;
    return res;
  }

}
