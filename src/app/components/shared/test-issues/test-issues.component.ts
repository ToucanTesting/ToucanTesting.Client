import { Component, OnInit, Input } from '@angular/core';
import { TestIssue } from '@models';
import { TestActionsService, HandleErrorService, TestIssuesService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tt-test-issues',
  templateUrl: './test-issues.component.html',
  styleUrls: ['./test-issues.component.scss']
})
export class TestIssuesComponent {
  @Input() testIssues: TestIssue[];

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testIssuesService: TestIssuesService
  ) { }

  deleteTestIssue(testIssue: TestIssue) {
    this.testIssuesService.deleteTestIssue(testIssue.id)
      .subscribe(response => {
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
