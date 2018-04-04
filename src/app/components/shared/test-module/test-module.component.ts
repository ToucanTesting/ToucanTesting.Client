import { Component, OnInit, Input } from '@angular/core';
import { TestCasesService, ExpectedResultsService, TestResultsService, HandleErrorService, TestIssuesService } from '@services';
import { TestModulesService } from 'app/services/test-modules.service';
import { MatDialog } from '@angular/material';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { TestCase, TestModule, TestIssue } from '@models';
import { DialogType, Priority, TestResultStatus } from '../../../enums';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'test-module',
  templateUrl: './test-module.component.html'
})
export class TestModuleComponent {
  @Input() testModule: TestModule;
  @Input() isTestRun: boolean = false;
  @Input() testRunId: number;
  testCases: TestCase[];
  priority = Priority;
  testResultStatus = TestResultStatus;

  neverTested: boolean = false;

  statusFilters = {
    showAll: true,
    showPass: true,
    showFail: true,
    showCnt: true,
    showNa: true,
    showPending: true
  };

  filters = {
    onlyNeverTested: false
  }

  constructor(
  ) {
  }

  filterTestCases() {
    const results: TestCase[] = this.testModule.testCases.slice(0);

    if (this.filters.onlyNeverTested) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].lastTested) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    if (!this.statusFilters.showPass && !this.statusFilters.showAll) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].testResult && results[i].testResult.status === TestResultStatus.Pass) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    if (!this.statusFilters.showFail && !this.statusFilters.showAll) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].testResult && results[i].testResult.status === TestResultStatus.Fail) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    if (!this.statusFilters.showCnt && !this.statusFilters.showAll) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].testResult && results[i].testResult.status === TestResultStatus.CNT) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    if (!this.statusFilters.showNa && !this.statusFilters.showAll) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].testResult && results[i].testResult.status === TestResultStatus.NA) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    if (!this.statusFilters.showPending && !this.statusFilters.showAll) {
      for (let i = results.length - 1; i >= 0; i--) {
        if (!results[i].testResult || results[i].testResult.status === TestResultStatus.Pending) {
          results.splice(results.indexOf(results[i]), 1)
        }
      }
    }

    return results;
  }

  toggleStatusFilters() {
    for (const prop in this.statusFilters) {
      if (this.statusFilters.hasOwnProperty(prop)) {
        this.statusFilters[prop] = !this.statusFilters[prop];
      }
    }
  }
}
