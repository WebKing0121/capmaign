import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datatableClassname'
})
export class DatatableClassnamePipe implements PipeTransform {

  transform(classes: string[], customClasses?: string[]): any {
    return [
      ...(classes || []),
      ...(customClasses || [])
    ].join(' ');
  }

}
