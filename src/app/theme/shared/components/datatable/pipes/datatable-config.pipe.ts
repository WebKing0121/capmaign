import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datatableConfig'
})
export class DatatableConfigPipe implements PipeTransform {

  transform(value: boolean, ...args: any[]): any {
    return value !== false;
  }

}
