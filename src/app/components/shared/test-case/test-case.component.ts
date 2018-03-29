import { TestModule, TestCase, TestAction } from '@models';
import { TestCasesService, TestActionsService, ExpectedResultsService, TestConditionsService } from '@services';
import { Component, Input } from '@angular/core';
import { MatDialog, MatGridList } from '@angular/material';
import { DeleteDialogComponent } from '../dialogs/delete/delete-dialog.component';
import { Priority } from '../../../enums';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: '[test-case]',
    templateUrl: './test-case.component.html',
    styleUrls: ['./test-case.component.scss']
})
export class TestCaseComponent {
    panelOpenState: boolean = false;
    @Input() testCase: TestCase;
    @Input() testModule: TestModule;
    @Input() testIndex: number;
    @Input() isTestRun: boolean = false;
    isEditing = false;
    priorityOptions = Priority;

    constructor(
        private testCasesService: TestCasesService,
        private testActionsService: TestActionsService,
        private expectedResultsService: ExpectedResultsService,
        private testConditionsService: TestConditionsService,
        public dialog: MatDialog
    ) { }

    public truncateDescription(description: string): string {
        if (description.length > 74) {
            return description.substring(0, 75) + '...';
        }
        return description;
    }

    public getTestActions(testModule: TestModule, testCase: TestCase) {
        if (testCase.testActions.length <= 0) {
            this.testActionsService.getTestActions(testModule, testCase)
                .subscribe(testActions => {
                    this.testCase.testActions = testActions;
                })
        }
    }

    public getTestResults(testModule: TestModule, testCase: TestCase) {
        if (testCase.expectedResults.length <= 0) {
            this.expectedResultsService.getTestResults(testModule, testCase)
                .subscribe(expectedResults => {
                    console.log(expectedResults)
                    this.testCase.expectedResults = expectedResults;
                })
        }
    }

    public getTestConditions(testModule: TestModule, testCase: TestCase) {
        if (testCase.testConditions.length <= 0) {
            this.testConditionsService.getTestConditions(testModule, testCase)
                .subscribe(testConditions => {
                    this.testCase.testConditions = testConditions;
                })
        }
    }
}
