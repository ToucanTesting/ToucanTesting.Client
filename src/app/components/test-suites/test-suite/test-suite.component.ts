import { TestSuite, TestModule, TestCase } from '@models';
import { TestSuitesService, TestModulesService, TestCasesService, HandleErrorService } from '@services';
import { DialogType } from '../../../enums';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'test-suite',
    templateUrl: './test-suite.component.html'
})
export class TestSuiteComponent {
    isLoading: boolean = true;
    isSearching: boolean = false;
    testSuiteId: number;
    testModules: TestModule[];
    tempName: string;

    constructor(
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
        private testModulesService: TestModulesService,
        private testCasesService: TestCasesService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) { 
        this.testSuiteId = Number(this.route.snapshot.paramMap.get('id'))
    }

    ngOnInit() {
        this.testModulesService.getTestModules(this.testSuiteId)
            .subscribe(testModules => {
                this.testModules = testModules;
                this.isLoading = false;
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    searchTestCases(searchText: string): void {
        if (searchText.length === 0) {
            this.isSearching = false;
            return;
        }
        this.testCasesService
            .searchTestCases(searchText)
            .subscribe(testCases => {
                this.testModules.forEach(m => {
                    this.isSearching = true;
                    m.testCases = testCases.filter(c => c.testModuleId === m.id);
                });
            }, error => {
                this.handleErrorService.handleError(error);
            })
    };

    getTestCases(testModule: TestModule) {
        if (this.isSearching) {
            return;
        }
        const index = this.testModules.indexOf(testModule);
        this.testCasesService
            .getTestCases(testModule)
            .subscribe(testCases => {
                this.testModules[index].testCases = testCases;
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    openUpsertDialog(testModule?): void {
        const dialogRef = this.dialog.open(CreateTestModuleDialogComponent, {
            data: {
                title: 'Add a Test Module',
                type: DialogType.TestModule,
                testModule: testModule || null
            }
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res && testModule) {
                testModule.name = res.name;
                this.updateTestModule(testModule);
            }
            if (res && !testModule) {
                this.createTestModule(res)
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
                this.handleErrorService.handleError(error);
            });
    }

    updateTestModule(testModule: TestModule) {
        this.testModulesService
            .updateTestModule(testModule)
            .subscribe(res => {
                this.toastr.success(res.name, 'UPDATED');
            }, error => {
                this.handleErrorService.handleError(error);
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
                this.handleErrorService.handleError(error);
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
                this.handleErrorService.handleError(error);
            });
    }
}
