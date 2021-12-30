import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe'
})
export class DateTimePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // 2021-12-08T14:00:43
    let formattedDate = `${new Date( value ).toDateString().slice(4).replace(' ', ', ')} @ ${value.split('T')[1]}`;
    // let formattedDate = val.replace('T', ' @ ')
    return formattedDate;
  }

}
