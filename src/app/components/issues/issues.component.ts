import { Component, OnInit } from '@angular/core';
import { TestCasesService } from '@services';
import { TestCase } from '@models';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  testCases: TestCase[];

  constructor(
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
    console.log(testCase.bugId)
    testCase.bugId = null;
    this.testCasesService.updateTestCase(testCase)
      .subscribe(response => {
        const index = this.testCases.indexOf(testCase, 0);
        if (index > -1) {
          this.testCases.splice(index, 1);
        }
      })
  }
}
