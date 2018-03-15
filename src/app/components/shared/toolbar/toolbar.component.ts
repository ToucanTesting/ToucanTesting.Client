import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() edit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
