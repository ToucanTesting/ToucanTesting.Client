import { Component, OnInit, Input } from '@angular/core';
import { TestCase, TestAction } from '@models';
import { TestActionsService, HandleErrorService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tt-test-actions',
  templateUrl: './test-actions.component.html',
  styleUrls: ['./test-actions.component.scss']
})
export class TestActionsComponent {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  tempDescription: string;

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testActionsService: TestActionsService
  ) { }

  toggleIsEditing(testAction: TestAction) {
    if (!this.isTestRun) {
      testAction.isEditing = !testAction.isEditing;
    }
  }

  cancelEdit(testAction: TestAction) {
    testAction.isEditing = false;
    testAction.description = this.tempDescription;
  }

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
    testAction.isEditing = false;
    this.testActionsService
      .updateTestAction(testAction)
      .subscribe(res => {
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  blurOthers() {
    this.testCase.testActions.forEach(testAction => {
      testAction.isEditing = false;
    })
  }

  renameTestAction(testAction: TestAction) {
    testAction.isEditing = false;
    this.testActionsService
      .updateTestAction(testAction)
      .subscribe(res => {
        this.toastr.success(res.description, 'UPDATED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  deleteTestAction(testAction: TestAction) {
    this.testActionsService.deleteTestAction(testAction.id)
      .subscribe(response => {
        const index = this.testCase.testActions.indexOf(testAction, 0);
        if (index > -1) {
          this.testCase.testActions.splice(index, 1);
        }
        this.toastr.success(testAction.description, 'DELETED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

}
