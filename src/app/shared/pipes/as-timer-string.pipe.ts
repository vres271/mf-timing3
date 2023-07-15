import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asTimerString'
})
export class AsTimerStringPipe implements PipeTransform {

  transform(t: number | undefined): string {
    return new Date(t || 0).toISOString().substring(11,23);    
  }

}
