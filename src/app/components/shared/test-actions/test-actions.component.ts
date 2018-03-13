import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestAction } from '@models';
import { TestActionsService } from '@services';

@Component({
  selector: 'tt-test-actions',
  templateUrl: './test-actions.component.html',
  styleUrls: ['./test-actions.component.scss']
})
export class TestActionsComponent {
  isEditing: boolean = false;
  @Input() testCase: TestCase;

  constructor(
    private testActionsService: TestActionsService
  ) { }

  moveUp(testAction: TestAction) {
    const prev = this.testCase.testActions.find(ta => ta.sequence === (testAction.sequence - 1));
    testAction.sequence -= 1;
    prev.sequence += 1;

    const index = this.testCase.testActions.indexOf(testAction);
    this.testCase.testActions.splice(index, 1);
    this.testCase.testActions.splice(index - 1, 0, testAction);

    this.updateTestAction(testAction);
    this.updateTestAction(prev);
  }

  moveDown(testAction: TestAction) {
    const next = this.testCase.testActions.find(ta => ta.sequence === (testAction.sequence + 1));
    testAction.sequence -= 1;
    next.sequence += 1;

    const index = this.testCase.testActions.indexOf(testAction);
    this.testCase.testActions.splice(index, 1);
    this.testCase.testActions.splice(index + 1, 0, testAction);

    this.updateTestAction(testAction);
    this.updateTestAction(next);
  }

  updateTestAction(testAction: TestAction) {
    this.testActionsService
      .updateTestAction(testAction)
      .subscribe(res => {
      })
  }

  blurOthers() {
    this.testCase.testActions.forEach(testAction => {
      testAction.isEditing = false;
    })
  }

  createTestAction(description: string) {
    const testAction = new TestAction();
    testAction.description = description;
    testAction.testCaseId = this.testCase.id;
    testAction.sequence = this.testCase.testActions.length + 1;
    this.testActionsService.createTestAction(testAction)
      .subscribe(success => {
        this.testCase.testActions.push(testAction)
      })
  }

  deleteTestAction(testAction: TestAction) {
    this.testActionsService.deleteTestAction(testAction.id)
      .subscribe(response => {
        const index = this.testCase.testActions.indexOf(testAction, 0);
        if (index > -1) {
          this.testCase.testActions.splice(index, 1);
          this.testCase.testActions
            .filter((ta) => ta.sequence > testAction.sequence)
            .forEach(ta => {
              ta.sequence -= 1;
            })
        }
      })
  }

}
