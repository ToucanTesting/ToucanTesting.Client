import { Pipe, PipeTransform } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'priority' })
export class PriorityPipe {
    transform(value: any): string {
        let result;
        switch (value) {
            case 0:
                result = 'LOW'
                break;
            case 1:
                result = 'MEDIUM'
                break;
            case 2:
                result = 'HIGH'
                break;
            case 3:
                result = 'CRITICAL'
                break;
            default:
                result = 'NA'
        }
        return result;
    }
}
