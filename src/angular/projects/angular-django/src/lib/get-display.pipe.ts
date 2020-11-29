import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';

@Pipe({name: 'getDisplay', pure: true})
export class GetDisplayPipe implements PipeTransform {
  transform(serializer: any, fieldName: string): Observable<string> {
    console.log(fieldName);
    return serializer.getDisplay(fieldName);
  }
}
