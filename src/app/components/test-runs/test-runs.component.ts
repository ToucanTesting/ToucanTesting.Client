import { TestRunsService, HandleErrorService } from '@services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestRun } from '@models';
import { DialogType } from './../../enums';
import { CreateTestRunDialogComponent } from '@components/shared/dialogs/create/test-run/create-test-run-dialog.component';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../interfaces/pagination.interface';

@Component({
    selector: 'test-runs',
    templateUrl: './test-runs.component.html'
})
export class TestRunsComponent implements OnInit {
    isLoading: boolean = true;
    isSearching: boolean = false;
    testRuns: TestRun[];
    panelOpenState: boolean = false;
    pagination: Pagination;

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
        this.pagination = {
            pageNumber: this.route.snapshot.queryParamMap.get('pageNumber'),
            pageSize: this.route.snapshot.queryParamMap.get('pageSize'),
            totalPages: '1'
        };

        this.getTestRuns(this.pagination);
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

    searchTestRuns(searchText: string): void {
        if (searchText.length === 0) {
            this.isSearching = false;
        }
        this.getTestRuns(this.pagination, searchText);
    };

    getTestRuns(pagination: Pagination, searchText?: string) {
        this.pagination = pagination;
        this.isSearching = !!searchText;
        this.testRunsService
            .getTestRuns(this.pagination, searchText)
            .subscribe(res => {
                this.pagination.totalPages = res.headers.get('totalPages');
                if (Number(this.route.snapshot.queryParamMap.get('pageNumber')) > Number(this.pagination.totalPages)) {
                    const urlTree = this.router.parseUrl(this.router.url);
                    urlTree.queryParams['pageNumber'] = this.pagination.totalPages;
                    pagination.pageNumber = this.pagination.totalPages;

                    this.router.navigateByUrl(urlTree);
                    this.getTestRuns(pagination);
                }
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
                this.getTestRuns(this.pagination);
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
                    this.getTestRuns(this.pagination);
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
