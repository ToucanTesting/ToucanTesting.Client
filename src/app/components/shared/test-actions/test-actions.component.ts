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
    const index = this.testCase.testActions.indexOf(testAction);
    const prev = this.testCase.testActions[index - 1];
    const temp = prev.sequence;

    testAction.sequence = prev.sequence;
    prev.sequence = temp;

    this.testCase.testActions.splice(index, 1);
    this.testCase.testActions.splice(index - 1, 0, testAction);

    this.updateTestAction(testAction);
    this.updateTestAction(prev);
  }

  moveDown(testAction: TestAction) {
    const index = this.testCase.testActions.indexOf(testAction);
    const next = this.testCase.testActions[index + 1];
    const temp = next.sequence;

    next.sequence = testAction.sequence;
    testAction.sequence = temp;

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

    if (this.testCase.testActions.length > 1) {
      testAction.sequence = this.testCase.testActions[this.testCase.testActions.length - 1].sequence + 1;
    } else {
      testAction.sequence = 1;
    }

    this.testActionsService.createTestAction(testAction)
      .subscribe(res => {
        this.testCase.testActions.push(res)
      })
  }

  renameTestAction(testAction: TestAction) {
    this.testActionsService
      .updateTestAction(testAction)
      .subscribe(res => {
      })
  }

  deleteTestAction(testAction: TestAction) {
    this.testActionsService.deleteTestAction(testAction.id)
      .subscribe(response => {
        const index = this.testCase.testActions.indexOf(testAction, 0);
        if (index > -1) {
          this.testCase.testActions.splice(index, 1);
        }
      })
  }

}
