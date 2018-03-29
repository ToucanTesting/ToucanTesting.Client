import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from '@models';
import { ExpectedResultsService } from '@services';
import { ExpectedResult } from '../../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tt-expected-results',
  templateUrl: './expected-results.component.html',
  styleUrls: ['./expected-results.component.scss']
})
export class ExpectedResultsComponent {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  tempDescription: string;

  constructor(
    private toastr: ToastrService,
    private expectedResultsService: ExpectedResultsService
  ) { }

  toggleIsEditing(expectedResult: ExpectedResult) {
    if (!this.isTestRun) {
      expectedResult.isEditing = !expectedResult.isEditing;
    }
  }

  addExpectedResult(description: string) {
    const expectedResult: ExpectedResult = new ExpectedResult();
    expectedResult.testCaseId = this.testCase.id
    expectedResult.description = description;

    this.expectedResultsService.createExpectedResult(expectedResult)
      .subscribe(res => {
        this.testCase.expectedResults.push(res)
        this.toastr.success(res.description, 'CREATED');
      }, error => {
          this.toastr.error(error.statusText, 'ERROR');
      })
  }

  cancelEdit(expectedResult: ExpectedResult) {
    expectedResult.isEditing = false;
    expectedResult.description = this.tempDescription;
  }

  updateExpectedResult(expectedResult: ExpectedResult) {
    expectedResult.isEditing = false;
    this.expectedResultsService
      .updateExpectedResult(expectedResult)
      .subscribe(res => {
        this.toastr.success(res.description, 'UPDATED');
      }, error => {
          this.toastr.error(error.statusText, 'ERROR');
      })
  }

  deleteExpectedResult(expectedResult: ExpectedResult) {
    this.expectedResultsService.deleteExpectedResult(expectedResult.id)
      .subscribe(res => {
        const index = this.testCase.expectedResults.indexOf(expectedResult, 0);
        if (index > -1) {
          this.testCase.expectedResults.splice(index, 1);
        }
        this.toastr.success(expectedResult.description, 'DELETED');
      }, error => {
          this.toastr.error(error.statusText, 'ERROR');
      })
  }

}
