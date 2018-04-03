
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
  TestIssuesService
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

import { SideNavComponent } from './components/sidenav/sidenav.component';
import { TestRunsComponent } from './components/test-runs/test-runs.component';
import { TestRunComponent } from './components/test-runs/test-run/test-run.component';
import { TestSuitesComponent } from './components/test-suites/test-suites.component';
import { TestSuiteComponent } from './components/test-suites/test-suite/test-suite.component';
import { TestIssuesComponent } from '@components/shared/test-issues/test-issues.component';
import { ViewTestCaseDialogComponent } from './components/shared/dialogs/test-case/view-test-case-dialog.component';
import { CreateTestCaseDialogComponent } from './components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestSuiteDialogComponent } from '@components/shared/dialogs/create/test-suite/create-test-suite-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { CreateTestRunDialogComponent } from '@components/shared/dialogs/create/test-run/create-test-run-dialog.component';
import { LogIssueDialogComponent } from '@components/shared/dialogs/create/log-issue/log-issue-dialog.component';
import { DeleteDialogComponent } from './components/shared/dialogs/delete/delete-dialog.component';
import { ButtonComponent } from './components/shared/buttons/buttons.component';
import { KeysPipe } from './pipes/keys.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PriorityPipe } from './pipes/priority.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component';
import { APIInterceptor } from './services/api-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LoginComponent } from './components/login/login.component';
import { TestActionsComponent } from './components/shared/test-actions/test-actions.component';
import { IssuesComponent } from './components/issues/issues.component';
import { TestConditionsService } from './services';
import { PreConditionsComponent } from './components/shared/pre-conditions/pre-conditions.component';
import { ExpectedResultsComponent } from './components/shared/expected-results/expected-results.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { TestModuleComponent } from './components/shared/test-module/test-module.component';
import { TestReportComponent } from './components/test-runs/test-report/test-report.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { TestCaseComponent } from './components/shared/test-case/test-case.component';

export function gettoken() {
  return localStorage.getItem('access_token');
};

const jwtConf = {
  config: {
    tokenGetter: gettoken,
    whitelistedDomains: ['localhost:5000']
  }
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
    TestCaseComponent
  ],
  entryComponents: [CreateTestCaseDialogComponent, CreateTestSuiteDialogComponent, CreateTestModuleDialogComponent, CreateTestRunDialogComponent, DeleteDialogComponent, LogIssueDialogComponent, ViewTestCaseDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot(jwtConf),
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
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
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
