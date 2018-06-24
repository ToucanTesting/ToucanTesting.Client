import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tt-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {
  @Input() type: string;
  message: string;

  ngOnInit() {
    switch (this.type) {
      case 'suite':
        this.message = 'No Test Suites to display';
        break;
      case 'module':
        this.message = 'No Modules to display';
        break;
      case 'run':
        this.message = 'No Test Runs to display';
        break;
      case 'issue':
        this.message = 'No Issues';
        break;
      default:
        this.message = 'Invalid type';
        break;
    }
  }
}
