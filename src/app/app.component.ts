import { Component } from '@angular/core';
import { AuthService } from './services';
import { environment } from 'environments/environment';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})


export class AppComponent {
    constructor(public auth: AuthService) { }

    ngOnInit() {
        console.log(environment.baseUrl)
    }

}





