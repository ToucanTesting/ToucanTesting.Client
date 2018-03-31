import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestCondition } from '@models';
import { TestConditionsService, HandleErrorService } from '@services';
import { ToastrService } from 'ngx-toastr';

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

  toggleIsEditing(testCondition: TestCondition) {
    if (!this.isTestRun) {
      testCondition.isEditing = !testCondition.isEditing;
    }
  }

  cancelEdit(testCondition: TestCondition) {
    testCondition.isEditing = false;
    testCondition.description = this.tempDescription;
  }

  addTestCondition(description: string) {
    const testCondition: TestCondition = new TestCondition();
    testCondition.testCaseId = this.testCase.id
    testCondition.description = description;

    this.testConditionsService.createTestCondition(testCondition)
      .subscribe(res => {
        this.testCase.testConditions.push(res)
        this.toastr.success(res.description, 'CREATED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
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
