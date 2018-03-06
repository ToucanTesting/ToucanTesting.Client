import { TestSuite, TestModule } from '@models';
import { TestSuitesService, TestModulesService, TestCasesService } from '@services';
import { DialogType } from '../../../enums';
import { CreateDialog } from '../../shared/dialogs/create/create-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

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
        let id;
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
        let index = this.testModules.indexOf(testModule);
        this.testCasesService
            .getTestCases(testModule)
            .subscribe(testCases => {
                this.testModules[index].testCases = testCases;
            });
    }

    openCreateDialog(): void {
        let dialogRef = this.dialog.open(CreateDialog, { data: { title: "Add a Test Module", type: DialogType.TestModule } });

        dialogRef.afterClosed().subscribe(testModule => {
            testModule ? this.createTestModule(testModule) : false;
        });
    }

    createTestModule(testModule: TestModule) {
        testModule.testSuiteId = this.testSuiteId;
        this.testModulesService.createTestModule(testModule)
            .subscribe(testModule => {
                this.testModules.push(testModule);
            })
    }
}
