import { Component, OnInit } from '@angular/core';
import { TestCasesService } from '@services';
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
    private testCasesService: TestCasesService
  ) { }

  ngOnInit() {
    this.testCasesService
      .getIssues()
      .subscribe(testCases => {
        this.testCases = testCases;
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
          this.toastr.error(error.statusText, 'ERROR');
      })
  }
}
