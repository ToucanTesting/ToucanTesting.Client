import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: string[], sortProp: string, sortDir?: string): any[] {
    arr.sort((a: any, b: any) => {
      if (this.tryLowerCase(a[sortProp]) < this.tryLowerCase(b[sortProp])) {
        return -1;
      } else if (this.tryLowerCase(a[sortProp]) > this.tryLowerCase(b[sortProp])) {
        return 1;
      } else {
        return 0;
      }
    });
    if (sortDir) {
      return arr.reverse();
    }
    return arr;
  }

  private tryLowerCase(prop: any) {
    if(typeof prop === 'string') {
      return prop.toLowerCase();
    }
    return prop;
  }

}


