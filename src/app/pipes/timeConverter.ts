import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name:'time_Converter'
})
export class TimeConverter implements PipeTransform{

    transform(value: any) {
      const minutes: number = Math.floor(value / 60);
      const second = (value - minutes * 60)
      return ( ( (minutes <  10) ? 0+""+minutes : minutes)  + ':' + ( (second <  10) ? 0+""+second : second)) ;
    }
}
