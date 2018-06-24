import { Component, OnInit, Input, NgZone } from '@angular/core';
import { TestCase } from '@models';
import { ExpectedResultsService, HandleErrorService } from '@services';
import { ExpectedResult } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'tt-expected-results',
  templateUrl: './expected-results.component.html',
  styleUrls: ['./expected-results.component.scss']
})
export class ExpectedResultsComponent {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  tempExpectedResults: ExpectedResult[];
  tempDescription: string;

  constructor(
    private zone: NgZone,
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private expectedResultsService: ExpectedResultsService
  ) { }

  eventOptions: SortablejsOptions = {
    onChoose: () => {
      this.tempExpectedResults = this.testCase.expectedResults.slice();
    },
    onUpdate: (event) => {
      const origin = this.tempExpectedResults[event.oldIndex];
      const targetId = this.tempExpectedResults[event.newIndex].id;
      this.expectedResultsService
        .sortExpectedResults(origin, targetId)
        .subscribe(res => {
          this.zone.run(() => {
            this.testCase.expectedResults = res;
          })
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  };

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
