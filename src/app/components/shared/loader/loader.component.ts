import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() isSmall: boolean = false

  constructor() { }

}
