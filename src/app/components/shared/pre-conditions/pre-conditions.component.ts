import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestCondition } from '@models';
import { TestConditionsService } from '@services';

@Component({
  selector: 'tt-pre-conditions',
  templateUrl: './pre-conditions.component.html',
  styleUrls: ['./pre-conditions.component.scss']
})
export class PreConditionsComponent implements OnInit {
  @Input() testCase: TestCase;
  constructor(
    private testConditionsService: TestConditionsService
  ) { }

  ngOnInit() {
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
