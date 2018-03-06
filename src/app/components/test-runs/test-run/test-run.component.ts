// Fixes needed

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TestModulesService, TestRunsService, TestResultsService, TestCasesService } from '@services';
import { TestRun, TestSuite, TestModule, TestCase, TestResult } from '@models';
import { CreateDialog } from '../../shared/dialogs/create/create-dialog.component';
import { TestResultStatus } from '../../../enums';

@Component({
    styleUrls: ['./test-run.component.scss'],
    selector: 'test-run',
    templateUrl: './test-run.component.html'
})
export class TestRunComponent {
    testRun: TestRun;
    testRunId: number;
    testCases: TestCase[];
    testResults: TestResult[];
    testModules: TestModule[];
    testCaseCount: number;
    sendData = true;
    totalTestCases = 0;
    tempTestResults: TestResult[] = [];


    constructor(
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
                // tslint:disable-next-line:no-non-null-assertion
                this.testRunId = +params.get('id')!;
                this.testRunsService
                    .getTestRun(this.testRunId)
                    .subscribe(testRun => {
                        this.testRun = testRun;
                        this.testModulesService
                            // tslint:disable-next-line:no-non-null-assertion
                            .getTestModules(+(testRun.testSuiteId)!, testRun.createdAt)
                            .subscribe(testModules => {
                                this.testModules = testModules;
                            })
                    })

            })
    }

    getTestResults(testModule: TestModule) {
        const index = this.testModules.indexOf(testModule);
        this.testCasesService
            .getTestCases(testModule, this.testRun.createdAt)
            .subscribe(testCases => {
                this.testModules[index].testCases = testCases;
                this.testResultsService.getTestResults(this.testRunId)
                    .subscribe(testResults => {
                        if (testResults.length > 0) {
                            this.testResults = testResults;
                            this.getTestModuleTestResults(testModule);
                        }
                    })
            });
    }

    changeTestCaseStatus(testCase: TestCase): void {
        if (!(testCase.testResult)) {
            testCase.testResult = {
                id: 0,
                testCaseId: testCase.id,
                testRunId: this.testRunId,
                status: 0
            };
        } else if (testCase.testResult.status < 4) {
            testCase.testResult.status++
        } else {
            testCase.testResult.status = 0;
        }

        testCase.testResult.index = this.testResults.indexOf(testCase.testResult);

        const isInQueue = this.tempTestResults.find(result => result.id === testCase.testResult.id);
        if (!!isInQueue) {
            this.tempTestResults.splice(this.tempTestResults.indexOf(this.tempTestResults.find((res) => res.id === isInQueue.id), 0))
        }
        this.tempTestResults.push(testCase.testResult);

        if (this.sendData) {
            this.sendData = false;

            setTimeout(() => {
                this.testResultsService.upsertTestResult(this.tempTestResults)
                    .subscribe(responseArr => {
                        responseArr.forEach((res) => {

                            if (testCase.testResult.index > -1) {
                                this.testResults.splice(testCase.testResult.index, 0)
                            }
                            this.testResults.push(res)
                        })
                    });
                this.sendData = true;
                this.tempTestResults = [];
            }, 1000);
        }
    }

    getTestModuleTestResults(testModule: TestModule) {
        this.testResults.forEach((testResult: TestResult) => {
            const testModuleIndex = this.testModules.indexOf(testModule, 0);
            const testCaseIndex = this.testModules[testModuleIndex].testCases.findIndex(
                (c: TestCase) => c.id === testResult.testCaseId
            );
            this.testModules[testModuleIndex].testCases[testCaseIndex].testResult = testResult
        })
    }
}
