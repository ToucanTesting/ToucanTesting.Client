import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from '@models';

@Component({
  selector: 'tt-pre-conditions',
  templateUrl: './pre-conditions.component.html',
  styleUrls: ['./pre-conditions.component.scss']
})
export class PreConditionsComponent implements OnInit {
  @Input() testCase: TestCase;
  constructor() { }

  ngOnInit() {
  }

}
