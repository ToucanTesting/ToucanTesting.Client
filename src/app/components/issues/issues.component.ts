import { Component, OnInit } from '@angular/core';
import { TestCasesService, HandleErrorService, TestIssuesService } from '@services';
import { TestCase, TestIssue } from '@models';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
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
