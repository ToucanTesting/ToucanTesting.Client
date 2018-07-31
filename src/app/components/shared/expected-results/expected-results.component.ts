import { Component, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';
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
export class ExpectedResultsComponent implements OnChanges {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  @Input() isSorting: boolean;
  tempExpectedResults: ExpectedResult[];
  tempDescription: string;

  eventOptions: SortablejsOptions = {
    draggable: '.draggable',
    onChoose: () => this.tempExpectedResults = this.testCase.expectedResults.slice(),
    onUpdate: (event) => {
      const origin = this.tempExpectedResults[event.oldIndex];
      const targetId = this.tempExpectedResults[event.newIndex].id;
      this.expectedResultsService
        .sortExpectedResults(origin, targetId)
        .subscribe(res => {
          this.zone.run(() => this.testCase.expectedResults = res);
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  };

  constructor(
    private zone: NgZone,
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private expectedResultsService: ExpectedResultsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.isSorting = changes.isSorting.currentValue;
  }

  toggleIsEditing(expectedResult: ExpectedResult) {
    if (!this.isTestRun && !this.isSorting) {
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
