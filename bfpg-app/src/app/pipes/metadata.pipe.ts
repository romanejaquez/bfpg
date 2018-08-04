import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metadata'
})
export class MetadataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
