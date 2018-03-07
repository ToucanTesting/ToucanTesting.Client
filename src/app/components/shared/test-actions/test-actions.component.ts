import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestAction } from '@models';
import { TestActionsService } from '@services';

@Component({
  selector: 'tt-test-actions',
  templateUrl: './test-actions.component.html',
  styleUrls: ['./test-actions.component.scss']
})
export class TestActionsComponent implements OnInit {
  isEditing: boolean = false;
  @Input() testCase: TestCase;

  ngOnInit() {

  }

  constructor(
    private testActionsService: TestActionsService
  ) { }

  moveUp(testAction: TestAction) {
    const previous = this.testCase.testActions.find(p => p.sequence === (testAction.sequence - 1));
    const tempSequence = previous.sequence;
    previous.sequence = testAction.sequence;
    testAction.sequence = tempSequence;

    const index = this.testCase.testActions.indexOf(testAction, 0);

    this.updateTestAction(previous);
    this.updateTestAction(testAction);
  }

  moveDown(testAction: TestAction) {
    const next = this.testCase.testActions.find(n => n.sequence === (testAction.sequence + 1));
    const tempSequence = next.sequence;
    next.sequence = testAction.sequence;
    testAction.sequence = tempSequence;

    const index = this.testCase.testActions.indexOf(testAction, 0);

    this.updateTestAction(next);
    this.updateTestAction(testAction);
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

}
