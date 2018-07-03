import { Component, OnInit } from '@angular/core';
import { TestCasesService, HandleErrorService, TestIssuesService } from '@services';
import { TestCase, TestIssue } from '@models';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  isLoading: boolean = true;
  testIssues: TestIssue[];

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testIssuesService: TestIssuesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.testIssuesService
      .getTestIssues()
      .subscribe(testIssues => {
        this.testIssues = testIssues;
        this.isLoading = false;
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  openTestIssueDeleteDialog(testIssue: TestIssue): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testIssue.reference } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.removeIssue(testIssue)
      }
    });
  }

  openTestCaseEditDialog(testIssue: TestIssue): void {
    const dialogRef = this.dialog.open(LogIssueDialogComponent, { data: { title: 'Log an Issue', payload: testIssue } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        testIssue.description = res.description;
        testIssue.reference = res.reference;
        this.updateTestIssue(testIssue)
      }
    });
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
