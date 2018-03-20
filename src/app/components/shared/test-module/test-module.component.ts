import { Component, OnInit, Input } from '@angular/core';
import { TestCasesService, ExpectedResultsService, TestResultsService } from '@services';
import { TestModulesService } from 'app/services/test-modules.service';
import { MatDialog } from '@angular/material';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { TestCase, TestModule } from '@models';
import { DialogType, Priority, TestResultStatus } from '../../../enums';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';

@Component({
  selector: 'test-module-temp',
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
    private testCasesService: TestCasesService,
    private testModulesService: TestModulesService,
    private expectedResultsService: ExpectedResultsService,
    private testResultsService: TestResultsService,
    public dialog: MatDialog
  ) {
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTestCaseDialogComponent, { data: { title: 'Add a Case', type: DialogType.TestCase } });

    dialogRef.afterClosed().subscribe(testCase => {
      testCase ? this.addTestCase(testCase) : false;
    });
  }

  addTestCase(testCase: TestCase): void {
    testCase.testModuleId = this.testModule.id;
    testCase.isEnabled = true;
    this.testCasesService.createTestCase(testCase)
      .subscribe(result => {
        this.testModule.testCases.push(result);
      })
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
        testCase.bugId = res.bugId;
        testCase.testModuleId = res.testModuleId;
        this.updateTestCase(testCase)
      }
    });
  }

  updateTestCase(testCase: TestCase): void {
    this.testCasesService.updateTestCase(testCase)
      .subscribe(result => {
        testCase = result;
        if (testCase.testModuleId !== this.testModule.id) {
          const index = this.testModule.testCases.findIndex(tc => tc.id === testCase.id);
          this.testModule.testCases.splice(index, 1)
        }
      })
  }

  deleteTestCase(testCase: TestCase) {
    this.testCasesService.deleteTestCase(testCase)
      .subscribe(success => {
        const index = this.testModule.testCases.indexOf(testCase);
        if (index > -1) {
          this.testModule.testCases.splice(index, 1);
        }
      })
  }

  changeTestCaseStatus(testCase: TestCase, status: TestResultStatus) {
    testCase.testResult = {
      testCaseId: testCase.id,
      testRunId: this.testRunId,
      status: status
    };
    this.testResultsService.upsertTestResult(testCase.testResult)
      .subscribe(testResult => {
        testCase.lastTested = new Date(Date.now());
        this.testCasesService.updateTestCase(testCase)
          .subscribe(testCaseResponse => {

          })
      });
  }

  public getExpectedResults(testModule: TestModule, testCase: TestCase) {
    if (testCase.expectedResults.length <= 0) {
      this.expectedResultsService.getTestResults(testModule, testCase)
        .subscribe(expectedResults => {
          const index = this.testModule.testCases.indexOf(testCase)
          this.testModule.testCases[index].expectedResults = expectedResults;
        })
    }
  }

}
