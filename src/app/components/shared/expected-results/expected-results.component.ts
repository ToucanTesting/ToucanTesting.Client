import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from '@models';
import { ExpectedResultsService } from '@services';
import { ExpectedResult } from '../../../models';

@Component({
  selector: 'tt-expected-results',
  templateUrl: './expected-results.component.html',
  styleUrls: ['./expected-results.component.scss']
})
export class ExpectedResultsComponent implements OnInit {
  @Input() testCase: TestCase;

  constructor(
    private expectedResultsService: ExpectedResultsService
  ) { }

  ngOnInit() {
  }

  addTestCondition(description: string) {
    const expectedResult: ExpectedResult = new ExpectedResult();
    expectedResult.testCaseId = this.testCase.id
    expectedResult.description = description;

    this.expectedResultsService.createExpectedResult(expectedResult)
      .subscribe(res => {
        this.testCase.expectedResults.push(res)
      })
  }

  updateExpectedResult(expectedResult: ExpectedResult) {
    this.expectedResultsService
      .updateExpectedResult(expectedResult)
      .subscribe(res => {
      })
  }

  deleteExpectedResult(expectedResult: ExpectedResult) {
    this.expectedResultsService.deleteTestCondition(expectedResult.id)
      .subscribe(res => {
        const index = this.testCase.expectedResults.indexOf(expectedResult, 0);
        if (index > -1) {
          this.testCase.expectedResults.splice(index, 1);
        }
      })
  }

}
