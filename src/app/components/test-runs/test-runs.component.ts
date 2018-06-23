import { TestRunsService, HandleErrorService } from '@services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class TestRunsComponent implements OnInit {
    isLoading: boolean = true;
    testRuns: TestRun[];
    panelOpenState: boolean = false;
    pageNumber: string;
    pageSize: string;
    totalPages: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
        private testRunsService: TestRunsService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.pageNumber = this.route.snapshot.queryParamMap.get('pageNumber');
        this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
        this.getTestRuns(this.pageNumber);
    }

    openUpsertDialog(testRun?: TestRun): void {
        const dialogRef = this.dialog.open(CreateTestRunDialogComponent, {
            data: {
                title: 'Start a New Test Run',
                type: DialogType.TestRun,
                testRun: testRun || null
            }
        });

        dialogRef.afterClosed().subscribe(res => {
            if (testRun && res) {
                testRun.name = res.name;
                this.renameTestRun(testRun);
            } else if (!testRun && res) {
                this.createTestRun(res);
            }
        });
    }

    getTestRuns(pageNumber: string) {
        this.pageNumber = pageNumber;
        this.testRunsService
            .getTestRuns(this.pageNumber, this.pageSize)
            .subscribe(res => {
                this.totalPages = res.headers.get('totalPages');
                this.testRuns = res.body;
                this.isLoading = false;
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    createTestRun(testRun: TestRun) {
        this.testRunsService.createTestRun(testRun)
            .subscribe(res => {
                this.toastr.success(res.name, 'CREATED');
                this.getTestRuns(this.pageNumber);
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
                    this.getTestRuns(this.pageNumber);
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
