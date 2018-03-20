import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestCondition } from '@models';
import { TestConditionsService } from '@services';

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
    console.log(testCondition)

    this.testConditionsService.createTestCondition(testCondition)
      .subscribe(res => {
        this.testCase.testConditions.push(res)
      })
  }

  updateTestCondition(testCondition: TestCondition) {
    testCondition.isEditing = false;
    this.testConditionsService
      .updateTestCondition(testCondition)
      .subscribe(res => {
      })
  }

  deleteTestCondition(testCondition: TestCondition) {
    this.testConditionsService.deleteTestCondition(testCondition.id)
      .subscribe(res => {
        const index = this.testCase.testConditions.indexOf(testCondition, 0);
        if (index > -1) {
          this.testCase.testConditions.splice(index, 1);
        }
      })
  }

}
