import {
  ExpectedResultsService,
  TestSuitesService,
  TestRunsService,
  TestResultsService,
  TestModulesService,
  TestCasesService,
  TestActionsService,
  AuthService,
  HandleErrorService,
  TestIssuesService,
} from '@services';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatDialogModule,
} from '@angular/material';
import { SortablejsModule } from 'angular-sortablejs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { KeysPipe } from './pipes/keys.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PriorityPipe } from './pipes/priority.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestConditionsService } from './services';

import { SideNavComponent } from '@components/sidenav/sidenav.component';
import { TestRunsComponent } from '@components/test-runs/test-runs.component';
import { TestRunComponent } from '@components/test-runs/test-run/test-run.component';
import { TestSuitesComponent } from '@components/test-suites/test-suites.component';
import { TestSuiteComponent } from '@components/test-suites/test-suite/test-suite.component';
import { TestIssuesComponent } from '@components/shared/test-issues/test-issues.component';
import { ViewTestCaseDialogComponent } from '@components/shared/dialogs/test-case/view-test-case-dialog.component';
import { CreateTestCaseDialogComponent } from '@components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestSuiteDialogComponent } from '@components/shared/dialogs/create/test-suite/create-test-suite-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { CreateTestRunDialogComponent } from '@components/shared/dialogs/create/test-run/create-test-run-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { DeleteDialogComponent } from '@components/shared/dialogs/delete/delete-dialog.component';
import { ButtonComponent } from '@components/shared/buttons/buttons.component';
import { TopnavComponent } from '@components/topnav/topnav.component';
import { LoginComponent } from '@components/login/login.component';
import { TestActionsComponent } from '@components/shared/test-actions/test-actions.component';
import { IssuesComponent } from '@components/issues/issues.component';
import { PreConditionsComponent } from '@components/shared/pre-conditions/pre-conditions.component';
import { ExpectedResultsComponent } from '@components/shared/expected-results/expected-results.component';
import { ToolbarComponent } from '@components/shared/toolbar/toolbar.component';
import { TestModuleComponent } from '@components/shared/test-module/test-module.component';
import { TestReportComponent } from '@components/test-runs/test-report/test-report.component';
import { LoaderComponent } from '@components/shared/loader/loader.component';
import { TestCaseComponent } from '@components/shared/test-case/test-case.component';
import { NoContentComponent } from '@components/shared/no-content/no-content.component';

import { ToastrModule } from 'ngx-toastr';
import { ManualChartComponent } from '@components/test-runs/test-report/manual-chart/manual-chart.component';
import { TotalsChartComponent } from '@components/test-runs/test-report/totals-chart/totals-chart.component';
import { AutoChartComponent } from '@components/test-runs/test-report/auto-chart/auto-chart.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
};

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TestSuitesComponent,
    TestRunsComponent,
    TestRunComponent,
    TestSuiteComponent,
    TestModuleComponent,
    TestIssuesComponent,
    ViewTestCaseDialogComponent,
    CreateTestCaseDialogComponent,
    CreateTestSuiteDialogComponent,
    CreateTestModuleDialogComponent,
    CreateTestRunDialogComponent,
    LogIssueDialogComponent,
    DeleteDialogComponent,
    ButtonComponent,
    KeysPipe,
    StatusPipe,
    PriorityPipe,
    TopnavComponent,
    LoginComponent,
    TestActionsComponent,
    IssuesComponent,
    PreConditionsComponent,
    ExpectedResultsComponent,
    ToolbarComponent,
    TestModuleComponent,
    TestReportComponent,
    LoaderComponent,
    TestCaseComponent,
    NoContentComponent,
    ManualChartComponent,
    TotalsChartComponent,
    AutoChartComponent,
    FilterPipe,
    OrderByPipe,
    PaginationComponent,
    SearchBarComponent
  ],
  entryComponents: [CreateTestCaseDialogComponent, CreateTestSuiteDialogComponent, CreateTestModuleDialogComponent, CreateTestRunDialogComponent, DeleteDialogComponent, LogIssueDialogComponent, ViewTestCaseDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    SortablejsModule.forRoot({ animation: 150 }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'localhost:5000',
          'api.toucantesting.com',
          'as-kno2toucanapi-dev.azurewebsites.net',
          'api-toucan-rj-perch-tst-wu2.azurewebsites.net'
        ],
        throwNoTokenError: true
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      enableHtml: true
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'test-suites', pathMatch: 'full' },
      { path: 'test-suites/:id', component: TestSuiteComponent },
      { path: 'test-suites', component: TestSuitesComponent },
      { path: 'test-runs', component: TestRunsComponent },
      { path: 'test-runs/:id', component: TestRunComponent },
      { path: 'test-reports/:id', component: TestReportComponent },
      { path: 'issues', component: IssuesComponent },
      { path: '**', redirectTo: 'suites' }
    ])
  ],
  providers: [
    TestSuiteComponent,
    TestSuitesService,
    TestRunsService,
    TestResultsService,
    TestModulesService,
    TestCasesService,
    TestActionsService,
    TestIssuesService,
    ExpectedResultsService,
    TestConditionsService,
    HandleErrorService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
