import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from '@models';
import { ExpectedResultsService, HandleErrorService } from '@services';
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
    private handleErrorService: HandleErrorService,
    private expectedResultsService: ExpectedResultsService
  ) { }

  toggleIsEditing(expectedResult: ExpectedResult) {
    if (!this.isTestRun) {
      expectedResult.isEditing = !expectedResult.isEditing;
    }
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
        this.handleErrorService.handleError(error);
      });
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
        this.handleErrorService.handleError(error);
      });
  }

}
