import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestCondition } from '@models';
import { TestConditionsService, HandleErrorService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'tt-pre-conditions',
  templateUrl: './pre-conditions.component.html',
  styleUrls: ['./pre-conditions.component.scss']
})
export class PreConditionsComponent {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  tempDescription: string;

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testConditionsService: TestConditionsService
  ) { }

  eventOptions: SortablejsOptions = {
    onUpdate: (event) => {
      const origin = this.testCase.testConditions[event.oldIndex];
      const targetId = this.testCase.testConditions[event.newIndex].id;
      this.testConditionsService
        .sortTestConditions(origin, targetId)
        .subscribe(res => {
          this.testCase.testConditions = res;
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  };

  toggleIsEditing(testCondition: TestCondition) {
    if (!this.isTestRun) {
      testCondition.isEditing = !testCondition.isEditing;
    }
  }

  cancelEdit(testCondition: TestCondition) {
    testCondition.isEditing = false;
    testCondition.description = this.tempDescription;
  }

  updateTestCondition(testCondition: TestCondition) {
    testCondition.isEditing = false;
    this.testConditionsService
      .updateTestCondition(testCondition)
      .subscribe(res => {
        this.toastr.success(res.description, 'UPDATED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  deleteTestCondition(testCondition: TestCondition) {
    this.testConditionsService.deleteTestCondition(testCondition.id)
      .subscribe(res => {
        const index = this.testCase.testConditions.indexOf(testCondition, 0);
        if (index > -1) {
          this.testCase.testConditions.splice(index, 1);
        }
        this.toastr.success(testCondition.description, 'DELETED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

}
