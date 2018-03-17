import { TestModulesService, TestCasesService, ExpectedResultsService } from '@services';
import { TestModule, TestCase } from '@models';
import { TestSuiteComponent } from './../test-suite.component';
import { CreateDialog } from './../../../shared/dialogs/create/create-dialog.component';
import { Component, Input } from '@angular/core';
import { DialogType } from '../../../../enums';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from '../../../shared/dialogs/delete/delete-dialog.component';

@Component({
    selector: 'test-module',
    templateUrl: './test-module.component.html'
})
export class TestModuleComponent {
    @Input() testModule: TestModule;

    constructor(
        private testCasesService: TestCasesService,
        private testModulesService: TestModulesService,
        private expectedResultsService: ExpectedResultsService,
        public dialog: MatDialog
    ) {
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateDialog, { data: { title: 'Add a Case', type: DialogType.TestCase } });

        dialogRef.afterClosed().subscribe(testCase => {
            testCase ? this.addTestCase(testCase) : false;
        });
    }

    addTestCase(testCase: TestCase): void {
        testCase.testModuleId = this.testModule.id;
        testCase.isEnabled = true;
        this.testCasesService.createTestCase(testCase)
            .subscribe(result => {
                this.testModule.testCases.push(result);
            })
    }

    openTestCaseDeleteDialog(testCase: TestCase): void {
        const dialogRef = this.dialog.open(DeleteDialog, { data: { title: testCase.description } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestCase(res) : false;
        });
    }

    openTestCaseEditDialog(testCase: TestCase): void {
        const dialogRef = this.dialog.open(CreateDialog, { data: { title: 'Update a Test Case', type: DialogType.TestCase, payload: testCase } });

        dialogRef.afterClosed().subscribe(res => {
            // Make properties not update!!!
            res ? this.updateTestCase(res) : null;
        });
    }

    updateTestCase(testCase: TestCase): void {
        this.testCasesService.updateTestCase(testCase)
            .subscribe(result => {
                const index = this.testModule.testCases.indexOf(testCase);
                this.testModule.testCases[index] = result;
            })
    }

    deleteTestCase(testCase: TestCase) {
        this.testCasesService.deleteTestCase(testCase)
            .subscribe(success => {
                const index = this.testModule.testCases.indexOf(testCase);
                if (index > -1) {
                    this.testModule.testCases.splice(index, 1);
                }
            })
    }

    public getTestResults(testModule: TestModule, testCase: TestCase) {
        if (testCase.expectedResults.length <= 0) {
            this.expectedResultsService.getTestResults(testModule, testCase)
                .subscribe(expectedResults => {
                    const index = this.testModule.testCases.indexOf(testCase)
                    this.testModule.testCases[index].expectedResults = expectedResults;
                })
        }
    }

}
