import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'splitMarks'
})
export class SplitMarksPipe implements PipeTransform{

transform(data:any){
    return data.split("/")[0]
}
}