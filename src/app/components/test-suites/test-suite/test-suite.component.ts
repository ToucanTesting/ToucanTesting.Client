import { TestSuite, TestModule, TestCase } from '@models';
import { TestSuitesService, TestModulesService, TestCasesService } from '@services';
import { DialogType } from '../../../enums';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'test-suite',
    templateUrl: './test-suite.component.html'
})
export class TestSuiteComponent {
    isLoading: boolean = true;
    testSuiteId: number;
    testModules: TestModule[];
    tempName: string;

    constructor(
        private toastr: ToastrService,
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
                        this.isLoading = false;
                    })
            })
    }

    cancelEdit(testModule: TestModule) {
        testModule.isEditing = false;
        testModule.name = this.tempName;
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
                this.toastr.success(res.name, 'CREATED');
            }, error => {
                this.toastr.error(error.statusText, 'ERROR');
            })
    }

    updateTestModule(testModule: TestModule) {
        testModule.isEditing = false;
        this.testModulesService
            .updateTestModule(testModule)
            .subscribe(res => {
                this.toastr.success(res.name, 'UPDATED');
            }, error => {
                this.toastr.error(error.statusText, 'ERROR');
            });
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
                this.toastr.success(testModule.name, 'DELETED');
            }, error => {
                this.toastr.error(error.statusText, 'ERROR');
            });
    }

    openCreateTestCaseDialog(testModule: TestModule): void {
        const dialogRef = this.dialog.open(CreateTestCaseDialogComponent, { width: '300px', data: { title: 'Add a Test Case', type: DialogType.TestCase } });

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
            .subscribe(res => {
                if (testModule.testCases) {
                    testModule.testCases.push(res);
                }
                this.toastr.success(res.description, 'CREATED');
            }, error => {
                if (!error.error.Description) {
                    this.toastr.error(error.statusText, 'ERROR');
                } else {
                    let errors = '';
                    error.error.Description.forEach((err) => errors += `<small>${err}<small><br>`);
                    this.toastr.error(errors, 'ERROR');
                }
            });
    }
}
