import { TestSuite, TestModule } from '@models';
import { TestSuitesService, TestModulesService, TestCasesService } from '@services';
import { DialogType } from '../../../enums';
import { CreateDialog } from '../../shared/dialogs/create/create-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from '../../shared/dialogs/delete/delete-dialog.component';

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
                this.testSuiteId = +params.get('id')!;
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
        const dialogRef = this.dialog.open(CreateDialog, { data: { title: "Add a Test Module", type: DialogType.TestModule } });

        dialogRef.afterClosed().subscribe(testModule => {
            testModule ? this.createTestModule(testModule) : false;
        });
    }

    createTestModule(testModule: TestModule) {
        testModule.testSuiteId = this.testSuiteId;
        this.testModulesService.createTestModule(testModule)
            .subscribe(res => {
                this.testModules.push(res);
            })
    }

    openModuleDeleteDialog(testModule: TestModule): void {
        const dialogRef = this.dialog.open(DeleteDialog, { data: { title: testModule.name } });

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
}
