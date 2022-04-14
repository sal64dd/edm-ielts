import { Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name:'slice_string',
})
export class SliceString implements PipeTransform{
    transform(data: any){
        if(data.length >8){
          return  data.slice(0,6) +"..."
        }
      return data;
    }

}
