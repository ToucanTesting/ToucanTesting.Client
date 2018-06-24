import { Component, OnInit, Input, NgZone } from '@angular/core';
import { TestCase, TestAction } from '@models';
import { TestActionsService, HandleErrorService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { TestCaseComponent } from '@components/shared/test-case/test-case.component';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'tt-test-actions',
  templateUrl: './test-actions.component.html',
  styleUrls: ['./test-actions.component.scss']
})
export class TestActionsComponent {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  tempTestActions: TestAction[];
  tempDescription: string;

  constructor(
    private zone: NgZone,
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testActionsService: TestActionsService
  ) { }

  eventOptions: SortablejsOptions = {
    onChoose: () => {
      this.tempTestActions = this.testCase.testActions.slice();
    },
    onUpdate: (event) => {
      const origin = this.tempTestActions[event.oldIndex];
      const targetId = this.tempTestActions[event.newIndex].id;
      this.testActionsService
        .sortTestActions(origin, targetId)
        .subscribe(res => {
          this.zone.run(() => {
            this.testCase.testActions = res;
          })
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  };

  toggleIsEditing(testAction: TestAction) {
    if (!this.isTestRun) {
      testAction.isEditing = !testAction.isEditing;
    }
  }

  cancelEdit(testAction: TestAction) {
    testAction.isEditing = false;
    testAction.description = this.tempDescription;
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

  sortedTestActions(testCase: TestCase) {
    return testCase.testActions.sort((a, b) => a.sequence - b.sequence)
  }

}
