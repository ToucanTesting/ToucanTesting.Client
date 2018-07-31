import { Component, Input, NgZone, SimpleChanges, OnChanges } from '@angular/core';
import { TestCase, TestAction } from '@models';
import { TestActionsService, HandleErrorService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'tt-test-actions',
  templateUrl: './test-actions.component.html',
  styleUrls: ['./test-actions.component.scss']
})
export class TestActionsComponent implements OnChanges {
  @Input() testCase: TestCase;
  @Input() isTestRun: boolean = false;
  @Input() isSorting: boolean = false;
  tempTestActions: TestAction[];
  tempDescription: string;

  eventOptions: SortablejsOptions = {
    draggable: '.draggable',
    onChoose: () => this.tempTestActions = this.testCase.testActions.slice(),
    onUpdate: (event) => {
      const origin = this.tempTestActions[event.oldIndex];
      const targetId = this.tempTestActions[event.newIndex].id;
      this.testActionsService
        .sortTestActions(origin, targetId)
        .subscribe(res => {
          this.zone.run(() => this.testCase.testActions = res);
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  };

  constructor(
    private zone: NgZone,
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testActionsService: TestActionsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.isSorting = changes.isSorting.currentValue;
  }

  toggleIsEditing(testAction: TestAction) {
    if (!this.isTestRun && !this.isSorting) {
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

}
