import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorService {
    constructor(
        private toastr: ToastrService
    ) { }

    public handleError(error: any): void {
        if (error.error.Description) {
            let errors = '';
            error.error.Description.forEach((err) => errors += `<small>${err}<small><br>`);
            this.toastr.error(errors, 'ERROR');
        } else if (error.error.Name) {
            let errors = '';
            error.error.Name.forEach((err) => errors += `<small>${err}<small><br>`);
            this.toastr.error(errors, 'ERROR');
        } else {
            this.toastr.error(error.statusText, 'ERROR');
        }
    }
}
