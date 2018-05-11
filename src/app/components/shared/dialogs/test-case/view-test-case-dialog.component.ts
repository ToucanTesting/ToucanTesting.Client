import { TestModule, TestCase, TestAction, ExpectedResult, TestCondition, TestIssue } from '@models';
import { TestCasesService, TestActionsService, ExpectedResultsService, TestConditionsService, HandleErrorService } from '@services';
import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Priority } from '../../../../enums';
import { ToastrService } from 'ngx-toastr';

interface IDialogData {
    title: string;
    testModule: TestModule;
    testCase: TestCase;
    isTestReport: boolean;
    type: string;
}

@Component({
    selector: 'view-test-case-dialog',
    templateUrl: './view-test-case-dialog.component.html'
})
export class ViewTestCaseDialogComponent implements OnInit {
    title: string;
    type: string = 'expected';
    testCase: TestCase;
    testModule: TestModule;
    isTestReport: boolean = false;
    priorityOptions = Priority;

    constructor(
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
        private testCasesService: TestCasesService,
        private testActionsService: TestActionsService,
        private expectedResultsService: ExpectedResultsService,
        private testConditionsService: TestConditionsService,
        public dialogRef: MatDialogRef<ViewTestCaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData
    ) {
        console.log(data);
        this.title = data.title;
        this.type = data.type;
        this.testCase = data.testCase;
        this.testModule = data.testModule;
        this.isTestReport = data.isTestReport;
    }

    ngOnInit() {
        console.log(this.type, this.isTestReport);
        if (this.testCase.expectedResults.length <= 0 && this.type !== 'issue') {
            this.expectedResultsService.getTestResults(this.testModule, this.testCase)
                .subscribe((expectedResults: ExpectedResult[]) => {
                    const index = this.testModule.testCases.indexOf(this.testCase)
                    this.testModule.testCases[index].expectedResults = expectedResults;
                }, error => {
                    this.handleErrorService.handleError(error);
                });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addExpectedResult(description: string) {
        const expectedResult: ExpectedResult = new ExpectedResult();
        expectedResult.testCaseId = this.testCase.id
        expectedResult.description = description;

        this.expectedResultsService.createExpectedResult(expectedResult)
            .subscribe(res => {
                this.testCase.expectedResults.push(res)
                this.toastr.success(res.description, 'CREATED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    addTestCondition(description: string) {
        const testCondition: TestCondition = new TestCondition();
        testCondition.testCaseId = this.testCase.id
        testCondition.description = description;

        this.testConditionsService.createTestCondition(testCondition)
            .subscribe(res => {
                this.testCase.testConditions.push(res)
                this.toastr.success(res.description, 'CREATED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    addTestAction(description: string) {
        const testAction = new TestAction();
        testAction.description = description;
        testAction.testCaseId = this.testCase.id;

        if (this.testCase.testActions.length > 0) {
            testAction.sequence = this.testCase.testActions[this.testCase.testActions.length - 1].sequence + 1;
        } else {
            testAction.sequence = 1;
        }

        this.testActionsService.createTestAction(testAction)
            .subscribe(res => {
                this.testCase.testActions.push(res)
                this.toastr.success(res.description, 'CREATED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

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
                }, error => {
                    this.handleErrorService.handleError(error);
                });
        }
    }

    public getTestResults(testModule: TestModule, testCase: TestCase) {
        if (testCase.expectedResults.length <= 0) {
            this.expectedResultsService.getTestResults(testModule, testCase)
                .subscribe(expectedResults => {
                    this.testCase.expectedResults = expectedResults;
                }, error => {
                    this.handleErrorService.handleError(error);
                });
        }
    }

    public getTestConditions(testModule: TestModule, testCase: TestCase) {
        if (testCase.testConditions.length <= 0) {
            this.testConditionsService.getTestConditions(testModule, testCase)
                .subscribe(testConditions => {
                    this.testCase.testConditions = testConditions;
                }, error => {
                    this.handleErrorService.handleError(error);
                });
        }
    }
}
