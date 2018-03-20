import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TestSuitesService } from '@services';
import { CreateTestSuiteDialogComponent } from '../shared/dialogs/create/test-suite/create-test-suite-dialog.component';
import { DeleteDialogComponent } from './../shared/dialogs/delete/delete-dialog.component';
import { DialogType } from './../../enums';
import { TestSuite } from '@models';

@Component({
    selector: 'test-suites',
    templateUrl: './test-suites.component.html'
})
export class TestSuitesComponent {
    testSuites: TestSuite[];
    hoverIndex: number | null;

    constructor(
        private testSuitesService: TestSuitesService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.testSuitesService
            .getTestSuites()
            .subscribe(testSuites => {
                this.testSuites = testSuites;
            });
    }

    openDeleteDialog(testSuite: TestSuite): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testSuite.name } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestSuite(testSuite) : false;
        });
    }

    deleteTestSuite(suite: TestSuite) {
        this.testSuitesService
            .deleteTestSuite(suite.id)
            .subscribe(success => {
                const index = this.testSuites.indexOf(suite, 0);
                if (index > -1) {
                    this.testSuites.splice(index, 1);
                }
            })
    }

    renameTestSuite(testSuite: TestSuite) {
        this.testSuitesService
            .updateTestSuite(testSuite)
            .subscribe(res => {
            })
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateTestSuiteDialogComponent, { data: { title: 'Create a New Test Suite', type: DialogType.TestSuite } });

        dialogRef.afterClosed().subscribe(testSuite => {
            if (testSuite) {
                this.createTestSuite(testSuite)
            }
        });
    }

    createTestSuite(testSuite: TestSuite) {
        this.testSuitesService.createTestSuites(testSuite)
            .subscribe(res => {
                this.testSuites.push(res);
            })
    }
}
