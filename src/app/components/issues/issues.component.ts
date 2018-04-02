import { Component, OnInit } from '@angular/core';
import { TestCasesService, HandleErrorService } from '@services';
import { TestCase } from '@models';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  testCases: TestCase[];

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testCasesService: TestCasesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.testCasesService
      .getIssues()
      .subscribe(testCases => {
        this.testCases = testCases;
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  openTestCaseDeleteDialog(testCase: TestCase): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testCase.bugId } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.removeIssue(testCase)
      }
    });
  }

  removeIssue(testCase: TestCase) {
    testCase.bugId = null;
    this.testCasesService.updateTestCase(testCase)
      .subscribe(res => {
        const index = this.testCases.indexOf(testCase);
        if (index > -1) {
          this.testCases.splice(index, 1);
        }
        this.toastr.success(res.description, 'DELETED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }
}
