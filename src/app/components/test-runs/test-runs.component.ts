import { TestRunsService, HandleErrorService } from '@services';
import { Component } from '@angular/core';
import { TestRun } from '@models';
import { DialogType } from './../../enums';
import { CreateTestRunDialogComponent } from '@components/shared/dialogs/create/test-run/create-test-run-dialog.component';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'test-runs',
    templateUrl: './test-runs.component.html'
})
export class TestRunsComponent {
    testRuns: TestRun[];
    panelOpenState: boolean = false;

    constructor(
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
        private testRunsService: TestRunsService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.testRunsService
            .getTestRuns()
            .subscribe(testRuns => {
                this.testRuns = testRuns;
            })
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateTestRunDialogComponent, {
            data: {
                title: 'Start a New Test Run',
                type: DialogType.TestRun
            }
        });

        dialogRef.afterClosed().subscribe(testRun => {
            if (testRun) {
                this.createTestRun(testRun)
            }
        });
    }

    createTestRun(testRun: TestRun) {
        this.testRunsService.createTestRun(testRun)
            .subscribe(res => {
                this.testRuns.push(res);
                this.toastr.success(res.name, 'CREATED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    openDeleteDialog(testRun: TestRun): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testRun.name } });

        dialogRef.afterClosed().subscribe(res => {
            res ? this.deleteTestRun(testRun) : false;
        });
    }

    deleteTestRun(testRun: TestRun) {
        this.testRunsService.deleteTestRun(testRun.id)
            .subscribe(success => {
                const index = this.testRuns.indexOf(testRun, 0);
                if (index > -1) {
                    this.testRuns.splice(index, 1);
                }
                this.toastr.success(testRun.name, 'DELETED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    renameTestRun(testRun: TestRun) {
        this.testRunsService
            .updateTestRun(testRun)
            .subscribe(res => {
                this.toastr.success(res.name, 'UPDATED');
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }
}
