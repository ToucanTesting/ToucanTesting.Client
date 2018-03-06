import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
    let keyArr: any[] = Object.keys(value),
        dataArr: any[] = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
        dataArr.push(value[key]);
    });

    // return the resulting array
    return dataArr;
}
}