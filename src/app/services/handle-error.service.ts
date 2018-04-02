import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorService {
    constructor(
        private toastr: ToastrService
    ) { }

    public handleError(error: any): void {
        if (!error.error.Description) {
            this.toastr.error(error.statusText, 'ERROR');
        } else {
            let errors = '';
            error.error.Description.forEach((err) => errors += `<small>${err}<small><br>`);
            this.toastr.error(errors, 'ERROR');
        }
    }
}
