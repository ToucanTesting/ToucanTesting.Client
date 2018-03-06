import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: 'status' })
export class StatusPipe {
    transform(value: any): string {
        let result;
        switch (value) {
            case 0:
                result = "PASS"
                break;
            case 1:
                result = "FAIL"
                break;
            case 2:
                result = "CNT"
                break;
            case 3:
                result = "NA"
                break;
            case 4:
                result = "PENDING"
                break;
            default:
                result = "PENDING"
        }
        return result;
    }
}