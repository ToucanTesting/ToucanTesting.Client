import { TestModulesService, TestCasesService } from '@services';
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
        private testSuiteComponent: TestSuiteComponent,
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
        this.testCasesService.addTestCase(testCase)
            .subscribe(result => {
                this.testModule.testCases.push(result);
            })
    }

    openDeleteDialog(component: TestModule): void {
        const dialogRef = this.dialog.open(DeleteDialog, { data: { title: component.name } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestModule(component) : false;
        });
    }

    deleteTestModule(testModule: TestModule) {
        this.testModulesService.deleteTestModule(testModule)
            .subscribe(success => {
                const index = this.testSuiteComponent.testModules.indexOf(testModule, 0);
                if (index > -1) {
                    this.testSuiteComponent.testModules.splice(index, 1);
                }
            })
    }

}
