import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TestSuitesService } from '@services';
import { CreateDialog } from '../shared/dialogs/create/create-dialog.component';
import { DeleteDialog } from './../shared/dialogs/delete/delete-dialog.component';
import { DialogType } from './../../enums';
import { TestSuite } from '@models';

@Component({
    selector: 'test-suites',
    templateUrl: './test-suites.component.html'
})
export class TestSuitesComponent {
    testSuites: TestSuite[];
    isEditing = false;
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
        console.log('here')
        const dialogRef = this.dialog.open(DeleteDialog, { data: { title: testSuite.name } });

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
        const dialogRef = this.dialog.open(CreateDialog, { data: { title: 'Create a New Test Suite', type: DialogType.TestSuite } });

        dialogRef.afterClosed().subscribe(testSuite => {
            testSuite ? this.createTestSuite(testSuite) : false;
        });
    }

    createTestSuite(testSuite: TestSuite) {
        this.testSuitesService.createTestSuites(testSuite)
            .subscribe(res => {
                this.testSuites.push(res);
            })
    }
}
