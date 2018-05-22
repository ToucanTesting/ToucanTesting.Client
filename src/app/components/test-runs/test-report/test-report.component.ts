import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TestModulesService, TestRunsService, TestResultsService, TestCasesService, ExpectedResultsService, TestIssuesService, HandleErrorService } from '@services';
import { TestRun, TestModule, TestCase, TestResult, TestIssue } from '@models';
import { TestResultStatus, Priority } from '../../../enums';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss']
})
export class TestReportComponent implements OnInit {
  hasIssues: boolean = false;
  totalsChart = [];
  modulesChart = [];

  isLoading: boolean = false;
  testRun: TestRun;
  testRunId: number;
  testResults: TestResult[] = [];
  testCases: TestCase[] = [];
  testModules: TestModule[];
  testResultStatus = TestResultStatus;
  priority = Priority;

  totalTestCases = {
    isReady: false,
    all: 0,
    auto: 0
  };

  manualTestCases = {
    isReady: false,
    total: 0,
    pass: 0,
    fail: 0,
    cnt: 0,
    na: 0
  };

  autoTestCases = {
    isReady: false,
    total: 0,
    pass: 0,
    fail: 0,
    cnt: 0,
    na: 0
  };

  constructor(
    private handleErrorService: HandleErrorService,
    private expectedResultsService: ExpectedResultsService,
    private testIssuesService: TestIssuesService,
    private testRunsService: TestRunsService,
    private testModulesService: TestModulesService,
    private testCasesService: TestCasesService,
    private testResultsService: TestResultsService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap
      .subscribe(params => {
        this.testRunId = this.route.snapshot.params['id'];
        this.testRunsService
          .getTestRun(this.testRunId, true)
          .subscribe(testRun => {
            if (testRun.testResults && testRun.testResults.length > 0) {
              this.testResults = testRun.testResults;
            }
            this.testRun = testRun;
            this.testModulesService
              .getTestReport(testRun.testSuiteId, testRun.createdAt)
              .subscribe(testModules => {
                testModules.forEach((testModule) => {
                  this.totalTestCases.auto = testModule.testCases.reduce((total, testCase) => {
                    return (testCase.isAutomated) ? total += 1 : total;
                  }, this.totalTestCases.auto)
                  this.totalTestCases.all += testModule.testCases.length;

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
                      const testCase = testModule.testCases.find(tc => tc.id === testResult.testCaseId);
                      testCase.testResult = testResult;
                      this.testCases.push(testCase);
                      if (testCase.isAutomated) {
                        this.autoTestCases.pass += 1;
                      } else {
                        this.manualTestCases.pass += 1;
                      }
                      return testResult;
                    }
                  }),
                  failures: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.Fail) {
                      const testCase = testModule.testCases.find(tc => tc.id === testResult.testCaseId);
                      testCase.testResult = testResult;
                      this.testCases.push(testCase);
                      if (testCase.isAutomated) {
                        this.autoTestCases.fail += 1;
                      } else {
                        this.manualTestCases.fail += 1;
                      }
                      return testResult;
                    }
                  }),
                  cnt: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.CNT) {
                      const testCase = testModule.testCases.find(tc => tc.id === testResult.testCaseId);
                      testCase.testResult = testResult;
                      this.testCases.push(testCase);
                      if (testCase.isAutomated) {
                        this.autoTestCases.cnt += 1;
                      } else {
                        this.manualTestCases.cnt += 1;
                      }
                      return testResult;
                    }
                  }),
                  na: this.testResults.filter(testResult => {
                    if (testResult.testModuleId === testModule.id && testResult.status === this.testResultStatus.NA) {
                      const testCase = testModule.testCases.find(tc => tc.id === testResult.testCaseId);
                      if (testCase.isAutomated) {
                        this.autoTestCases.na += 1;
                      } else {
                        this.manualTestCases.na += 1;
                      }
                      return testResult;
                    }
                  })
                }));

                this.isLoading = false;
                this.manualTestCases.isReady = true;
                this.totalTestCases.isReady = true;
                this.autoTestCases.isReady = true;
                this.populateChart();
              })
          })

      })
  }

  public populateChart() {
    const green = '#2BB673';
    const red = '#FE200B';
    const blue = '#4189C7'
    const gray = 'gray';

    const testModuleLabels = [];
    const passedTestData = [];
    const failedTestData = [];
    const cntTestData = [];
    const dntTestData = [];

    this.testModules.forEach(testModule => {
      testModuleLabels.push(testModule.name);
      passedTestData.push(testModule.passes.length);
      failedTestData.push(testModule.failures.length);
      cntTestData.push(testModule.cnt.length);
      dntTestData.push(testModule.testCases.length - testModule.passes.length - testModule.failures.length - testModule.cnt.length);

    });

    this.modulesChart = new Chart('modulesChart', {
      type: 'horizontalBar',
      data: {
        labels: testModuleLabels,
        datasets: [{
          label: 'Pass',
          data: passedTestData,
          backgroundColor: green
        },
        {
          label: 'Fail',
          data: failedTestData,
          backgroundColor: red
        },
        {
          label: 'CNT',
          data: cntTestData,
          backgroundColor: blue
        },
        {
          label: 'DNT',
          data: dntTestData,
          backgroundColor: gray
        }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'left'
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            categoryPercentage: 1,
            maxBarThickness: 25,
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: 14
            },
          }]
        }
      }
    });
  }

  public getTestIssues() {
    if (!this.hasIssues) {
      this.testIssuesService.getTestIssues()
        .subscribe(testIssues => {
          testIssues.forEach((testIssue: TestIssue) => {
            const testCase = this.testCases.find(tc => tc.id === testIssue.testCaseId);
            if (testCase) {
              testCase.testIssues.push(testIssue);
            }
          })
          this.hasIssues = true;
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  }
}
