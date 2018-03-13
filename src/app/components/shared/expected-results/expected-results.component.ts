import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from '@models';

@Component({
  selector: 'tt-expected-results',
  templateUrl: './expected-results.component.html',
  styleUrls: ['./expected-results.component.scss']
})
export class ExpectedResultsComponent implements OnInit {
  @Input() testCase: TestCase;

  constructor() { }

  ngOnInit() {
  }

}
