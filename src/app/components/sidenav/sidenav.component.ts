import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tt-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent {

    constructor(
        private router: Router
    ){}

    public isLinkActive(url): boolean {
        const charPos = this.router.url.indexOf('?');
        const cleanUrl = charPos !== -1 ? this.router.url.slice(0, charPos) : this.router.url;
        return (cleanUrl === url);
    }
}
