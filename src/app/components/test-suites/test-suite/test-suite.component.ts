import { TestSuite, TestModule, TestCase } from '@models';
import { TestSuitesService, TestModulesService, TestCasesService } from '@services';
import { DialogType } from '../../../enums';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete/delete-dialog.component';

@Component({
    selector: 'test-suite',
    templateUrl: './test-suite.component.html'
})
export class TestSuiteComponent {
    testSuiteId: number;
    testModules: TestModule[];

    constructor(
        private testSuitesService: TestSuitesService,
        private testModulesService: TestModulesService,
        private testCasesService: TestCasesService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                this.testSuiteId = this.route.snapshot.params['id'];
                this.testModulesService.getTestModules(this.testSuiteId)
                    .subscribe(testModules => {
                        this.testModules = testModules;
                    })
            })
    }

    getTestCases(testModule: TestModule) {
        const index = this.testModules.indexOf(testModule);
        this.testCasesService
            .getTestCases(testModule)
            .subscribe(testCases => {
                this.testModules[index].testCases = testCases;
            });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateTestModuleDialogComponent, { data: { title: 'Add a Test Module', type: DialogType.TestModule } });

        dialogRef.afterClosed().subscribe(testModule => {
            if (testModule) {
                this.createTestModule(testModule)
            }
        });
    }

    createTestModule(testModule: TestModule) {
        testModule.testSuiteId = this.testSuiteId;
        this.testModulesService.createTestModule(testModule)
            .subscribe(res => {
                this.testModules.push(res);
            })
    }

    renameTestModule(testModule: TestModule) {
        this.testModulesService
            .updateTestModule(testModule)
            .subscribe(res => {
            })
    }

    openModuleDeleteDialog(testModule: TestModule): void {

        const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testModule.name } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestModule(testModule) : false;
        });
    }

    deleteTestModule(testModule: TestModule) {
        this.testModulesService.deleteTestModule(testModule)
            .subscribe(res => {
                const index = this.testModules.indexOf(testModule, 0);
                if (index > -1) {
                    this.testModules.splice(index, 1);
                }
            })
    }

    openCreateTestCaseDialog(testModule: TestModule): void {
        const dialogRef = this.dialog.open(CreateTestCaseDialogComponent, { data: { title: 'Add a Test Case', type: DialogType.TestCase } });

        dialogRef.afterClosed().subscribe(testCase => {
            if (testCase) {
                testCase.testModuleId = testModule.id;
                testCase.isEnabled = true;
                this.createTestCase(testCase, testModule);
            }
        });
    }

    createTestCase(testCase: TestCase, testModule: TestModule): void {
        this.testCasesService.createTestCase(testCase)
            .subscribe(result => {
                if (testModule.testCases) {
                    testModule.testCases.push(result);
                }
            })
    }
}
