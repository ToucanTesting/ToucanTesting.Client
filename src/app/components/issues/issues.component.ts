import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestCasesService, HandleErrorService, TestIssuesService } from '@services';
import { TestCase, TestIssue } from '@models';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { ViewTestCaseDialogComponent } from '@components/shared/dialogs/test-case/view-test-case-dialog.component';
import { MatDialog } from '@angular/material';
import { Pagination } from 'app/interfaces/pagination.interface';

@Component({
  selector: 'tt-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  isLoading: boolean = true;
  isSearching: boolean = false;
  pagination: Pagination;
  @Input() public testIssues: TestIssue[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testIssuesService: TestIssuesService,
    private testCasesService: TestCasesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pagination = {
      pageNumber: this.route.snapshot.queryParamMap.get('pageNumber'),
      pageSize: this.route.snapshot.queryParamMap.get('pageSize'),
      totalPages: '1'
    };

    this.getTestIssues(this.pagination);
  }

  openTestIssueDeleteDialog(testIssue: TestIssue): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testIssue.reference } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.removeIssue(testIssue)
      }
    });
  }

  openTestIssueEditDialog(testIssue: TestIssue): void {
    const dialogRef = this.dialog.open(LogIssueDialogComponent, { data: { title: 'Log an Issue', payload: testIssue } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        testIssue.description = res.description;
        testIssue.reference = res.reference;
        this.updateTestIssue(testIssue)
      }
    });
  }

  async openTestCaseViewDialog(testCaseId: number, type?: string): Promise<void> {
    const testCase = await this.getTestCase(testCaseId);
    const dialogRef = this.dialog.open(ViewTestCaseDialogComponent, {
      data: {
        title: testCase.description,
        testCase: testCase,
        isTestReport: false,
        type: type
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
      });
  }

  searchTestIssues(searchText: string): void {
    if (searchText.length === 0) {
      this.isSearching = false;
    }
    this.getTestIssues(this.pagination, searchText);
  };

  getTestIssues(pagination: Pagination, searchText?: string) {
    this.pagination = pagination;
    this.isSearching = !!searchText;
    this.testIssuesService
      .getTestIssues(this.pagination, searchText)
      .subscribe(res => {
        this.pagination.totalPages = res.headers.get('totalPages');
        if (Number(this.route.snapshot.queryParamMap.get('pageNumber')) > Number(this.pagination.totalPages)) {
          const urlTree = this.router.parseUrl(this.router.url);
          urlTree.queryParams['pageNumber'] = this.pagination.totalPages;
          pagination.pageNumber = this.pagination.totalPages;

          this.router.navigateByUrl(urlTree);
          this.getTestIssues(pagination);
        }
        this.testIssues = res.body;
        this.isLoading = false;
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  async getTestCase(testCaseId: number) {
    return await this.testCasesService.getTestCase(testCaseId).toPromise();
  }

  updateTestIssue(testIssue: TestIssue) {
    this.testIssuesService
      .updateTestIssue(testIssue.id, testIssue)
      .subscribe((res: TestIssue) => {
        this.toastr.success(testIssue.reference, 'UPDATED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  removeIssue(testIssue: TestIssue) {
    this.testIssuesService.deleteTestIssue(testIssue.id)
      .subscribe(res => {
        const index = this.testIssues.indexOf(testIssue);
        if (index > -1) {
          this.testIssues.splice(index, 1);
        }
        this.toastr.success(testIssue.reference, 'DELETED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }
}
