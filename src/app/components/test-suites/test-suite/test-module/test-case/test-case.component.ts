import { TestModule, TestCase, TestAction } from '@models';
import { TestCasesService, TestActionsService, ExpectedResultsService, TestConditionsService } from '@services';
import { Component, Input } from '@angular/core';
import { MatDialog, MatGridList, MatTabChangeEvent } from '@angular/material';
import { DeleteDialog } from '../../../../shared/dialogs/delete/delete-dialog.component';
import { Priority } from '../../../../../enums';

@Component({
    selector: 'test-case',
    templateUrl: './test-case.component.html',
    styleUrls: ['./test-case.component.scss']
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
        private expectedResultsService: ExpectedResultsService,
        private testConditionsService: TestConditionsService,
        public dialog: MatDialog
    ) { }

    updateTestCase(testCase: TestCase) {
        this.testCasesService.updateTestCase(testCase).subscribe();
    }

    openDeleteDialog(testCase: TestCase): void {
        const dialogRef = this.dialog.open(DeleteDialog, { data: { title: testCase.description } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestCase(testCase) : false;
        });
    }

    deleteTestCase(testCase: TestCase) {
        this.testCasesService.deleteTestCase(testCase.id)
            .subscribe(success => {
                const index = this.testModule.testCases.indexOf(testCase, 0);
                if (index > -1) {
                    this.testModule.testCases.splice(index, 1);
                }
            })
    }

    getData(event: MatTabChangeEvent) {
        const selectedLabel = event.tab.textLabel;

        switch (selectedLabel) {
            case 'User Actions':
                if (this.testCase.testActions.length <= 0) {
                    this.getTestActions();
                }
                break;
            case 'Expected Results':
                if (this.testCase.expectedResults.length <= 0) {
                    this.getTestResults();
                }
                break;
            case 'Pre-Conditions':
                if (this.testCase.expectedResults.length <= 0) {
                    this.getTestConditions();
                }
                break;
            default:
                break;
        }
    }

    private getTestActions() {
        this.testActionsService.getTestActions(this.testModule, this.testCase)
            .subscribe(testActions => {
                this.testCase.testActions = testActions;
            })
    }

    private getTestResults() {
        this.expectedResultsService.getTestResults(this.testModule, this.testCase)
            .subscribe(expectedResults => {
                this.testCase.expectedResults = expectedResults;
            })
    }

    private getTestConditions() {
        this.testConditionsService.getTestConditions(this.testModule, this.testCase)
            .subscribe(testConditions => {
                this.testCase.testConditions = testConditions;
            })
    }
}
