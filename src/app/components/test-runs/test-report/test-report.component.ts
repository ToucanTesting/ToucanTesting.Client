import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TestModulesService, TestRunsService, TestResultsService, TestCasesService, ExpectedResultsService } from '@services';
import { TestRun, TestModule, TestCase, TestResult } from '@models';
import { TestResultStatus, Priority } from '../../../enums';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss']
})
export class TestReportComponent {
  testRun: TestRun;
  testRunId: number;
  testResults: TestResult[] = [];
  failures: TestResult[];
  testModules: TestModule[];
  testResultStatus = TestResultStatus;
  priority = Priority;
  totalTestCases: number = 0;
  totalAutomated: number = 0;
  totalPassCount: number = 0;
  totalFailCount: number = 0;
  totalCntCount: number = 0;
  totalNaCount: number = 0;
  totalPendingCount: number = 0;

  constructor(
    private expectedResultsService: ExpectedResultsService,
    private testRunsService: TestRunsService,
    private testModulesService: TestModulesService,
    private testCasesService: TestCasesService,
    private testResultsService: TestResultsService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.testRunId = this.route.snapshot.params['id'];
        this.testRunsService
          .getTestRun(this.testRunId)
          .subscribe(testRun => {
            if (testRun.testResults && testRun.testResults.length > 0) {
              this.testResults = testRun.testResults;
            }
            this.testRun = testRun;
            this.testModulesService
              .getTestReport(testRun.testSuiteId, testRun.createdAt)
              .subscribe(testModules => {
                testModules.forEach((testModule) => {
                  this.totalAutomated = testModule.testCases.reduce((total, testCase) => {
                    return (testCase.isAutomated) ? total += 1 : total;
                  }, this.totalAutomated)
                  this.totalTestCases += testModule.testCases.length;
                })
                this.testModules = testModules.map(testModule => ({
                  ...testModule,
                  sort: null,
                  reverse: false,
                  testResults: this.testResults.filter(testResult => {
                    return testResult.testModuleId === testModule.id;
                  }),
                  passes: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.Pass) {
                      this.totalPassCount += 1;
                      return testResult;
                    }
                  }),
                  failures: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.Fail) {
                      this.totalFailCount += 1;
                      return testResult;
                    }
                  }),
                  cnt: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.CNT) {
                      this.totalCntCount += 1;
                      return testResult;
                    }
                  }),
                  na: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.NA) {
                      this.totalNaCount += 1;
                      return testResult;
                    }
                  })
                }));
                this.totalPendingCount += (this.totalTestCases - (this.totalPassCount + this.totalFailCount + this.totalCntCount + this.totalNaCount))
              })
          })

      })
  }

}
