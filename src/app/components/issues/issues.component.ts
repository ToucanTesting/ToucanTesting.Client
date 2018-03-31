import { Component, OnInit } from '@angular/core';
import { TestCasesService, HandleErrorService } from '@services';
import { TestCase } from '@models';
import { ToastrService } from 'ngx-toastr';

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
    private testCasesService: TestCasesService
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
