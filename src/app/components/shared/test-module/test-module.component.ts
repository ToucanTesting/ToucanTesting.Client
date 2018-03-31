import { Component, OnInit, Input } from '@angular/core';
import { TestCasesService, ExpectedResultsService, TestResultsService, HandleErrorService } from '@services';
import { TestModulesService } from 'app/services/test-modules.service';
import { MatDialog } from '@angular/material';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { TestCase, TestModule } from '@models';
import { DialogType, Priority, TestResultStatus } from '../../../enums';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'test-module',
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.scss']
})
export class TestModuleComponent {
  @Input() testModule: TestModule;
  @Input() isTestRun: boolean = false;
  @Input() testRunId: number;
  priority = Priority;
  testResultStatus = TestResultStatus;

  constructor(
    private toastr: ToastrService,
    private handleErrorService: HandleErrorService,
    private testCasesService: TestCasesService,
    private testModulesService: TestModulesService,
    private expectedResultsService: ExpectedResultsService,
    private testResultsService: TestResultsService,
    public dialog: MatDialog
  ) {
  }

  openTestCaseDeleteDialog(testCase: TestCase): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { title: testCase.description } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteTestCase(testCase)
      }
    });
  }

  openTestCaseEditDialog(testCase: TestCase, testSuiteId?: number): void {
    const dialogRef = this.dialog.open(CreateTestCaseDialogComponent, { data: { title: 'Update a Test Case', payload: testCase, testSuiteId: (testSuiteId) ? testSuiteId : null } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        testCase.description = res.description;
        testCase.isAutomated = res.isAutomated;
        testCase.priority = res.priority;
        testCase.testModuleId = res.testModuleId;
        this.updateTestCase(testCase)
      }
    });
  }

  openLogIssueDialog(testCase: TestCase): void {
    const dialogRef = this.dialog.open(LogIssueDialogComponent, { data: { title: 'Log an Issue', payload: testCase } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        testCase.bugId = res.bugId;
        this.updateTestCase(testCase)
      }
    });
  }

  updateTestCase(testCase: TestCase): void {
    this.testCasesService.updateTestCase(testCase)
      .subscribe(res => {
        testCase = res;
        if (testCase.testModuleId !== this.testModule.id) {
          const index = this.testModule.testCases.findIndex(tc => tc.id === testCase.id);
          this.testModule.testCases.splice(index, 1)
        }
        this.toastr.success(res.description, 'UPDATED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  deleteTestCase(testCase: TestCase) {
    this.testCasesService.deleteTestCase(testCase)
      .subscribe(success => {
        const index = this.testModule.testCases.indexOf(testCase);
        if (index > -1) {
          this.testModule.testCases.splice(index, 1);
        }
        this.toastr.success(testCase.description, 'DELETED');
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  changeTestCaseStatus(testCase: TestCase, status: TestResultStatus) {
    if (testCase.testResult && testCase.testResult.testRunId === this.testRunId) {
      testCase.testResult.status = status;
    } else {
      testCase.testResult = {
        testCaseId: testCase.id,
        testRunId: this.testRunId,
        testModuleId: testCase.testModuleId,
        status: status
      };
    }

    this.testResultsService.upsertTestResult(testCase.testResult)
      .subscribe(testResult => {
        testCase.testResult = testResult;
        if (testCase.testResult.status === TestResultStatus.Pass || testCase.testResult.status === TestResultStatus.Fail) {
          testCase.lastTested = new Date(Date.now());
        }
        this.testCasesService.updateTestCase(testCase)
          .subscribe(testCaseResponse => {
          }, error => {
            this.handleErrorService.handleError(error);
          });
      }, error => {
        this.handleErrorService.handleError(error);
      });
  }

  public getExpectedResults(testModule: TestModule, testCase: TestCase) {
    if (testCase.expectedResults.length <= 0) {
      this.expectedResultsService.getTestResults(testModule, testCase)
        .subscribe(expectedResults => {
          const index = this.testModule.testCases.indexOf(testCase)
          this.testModule.testCases[index].expectedResults = expectedResults;
        }, error => {
          this.handleErrorService.handleError(error);
        });
    }
  }

}
