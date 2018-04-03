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
  priority = Priority;
  testResultStatus = TestResultStatus;

  constructor(
  ) {
  }

  filterData
}
