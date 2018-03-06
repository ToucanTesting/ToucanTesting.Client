import { TestModule, TestCase, TestAction } from '@models';
import { TestCasesService, TestActionsService } from '@services';
import { Component, Input } from '@angular/core';
import { MatDialog, MatGridList } from '@angular/material';
import { DeleteDialog } from '../../../../shared/dialogs/delete/delete-dialog.component';
import { Priority } from '../../../../../enums';

@Component({
    selector: 'test-case',
    templateUrl: './test-case.component.html'
})
export class TestCaseComponent {
    panelOpenState: boolean = false;
    @Input() testCase: TestCase;
    @Input() testModule: TestModule;
    isEditing = false;
    priorityOptions = Priority;

    constructor(
        private testCasesService: TestCasesService,
        private testActionsService: TestActionsService,
        public dialog: MatDialog
    ) { }

    updateTestCase(testCase: TestCase) {
        this.testCasesService.updateTestCase(testCase).subscribe();
    }

    openDeleteDialog(testCase: TestCase): void {
        let dialogRef = this.dialog.open(DeleteDialog, { data: { title: testCase.description } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestCase(testCase) : false;
        });
    }

    deleteTestCase(testCase: TestCase) {
        this.testCasesService.deleteTestCase(testCase.id)
            .subscribe(success => {
                let index = this.testModule.testCases.indexOf(testCase, 0);
                if (index > -1) {
                    this.testModule.testCases.splice(index, 1);
                }
            })
    }

    createTestAction(description: string) {
        let testAction = new TestAction();
        testAction.description = description;
        testAction.testCaseId = this.testCase.id;
        this.testActionsService.createTestAction(testAction)
            .subscribe(success => {
                this.testCase.testActions.push(testAction)
            })
    }
}