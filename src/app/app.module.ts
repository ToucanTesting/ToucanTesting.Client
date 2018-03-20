
import {
  ExpectedResultsService,
  TestSuitesService,
  TestRunsService,
  TestResultsService,
  TestModulesService,
  TestCasesService,
  TestActionsService,
  AuthService
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
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,

  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatStepperModule

} from '@angular/material';

import { SideNavComponent } from './components/sidenav/sidenav.component';
import { TestRunsComponent } from './components/test-runs/test-runs.component';
import { TestRunComponent } from './components/test-runs/test-run/test-run.component';
import { TestSuitesComponent } from './components/test-suites/test-suites.component';
import { TestSuiteComponent } from './components/test-suites/test-suite/test-suite.component';
import { TestCaseComponent } from './components/shared/test-case/test-case.component';
import { CreateTestCaseDialogComponent } from './components/shared/dialogs/create/test-case/create-test-case-dialog.component';
import { CreateTestSuiteDialogComponent } from '@components/shared/dialogs/create/test-suite/create-test-suite-dialog.component';
import { CreateTestModuleDialogComponent } from '@components/shared/dialogs/create/test-module/create-test-module-dialog.component';
import { CreateTestRunDialogComponent } from '@components/shared/dialogs/create/test-run/create-test-run-dialog.component';
import { DeleteDialogComponent } from './components/shared/dialogs/delete/delete-dialog.component';
import { ButtonComponent } from './components/shared/buttons/buttons.component';
import { KeysPipe } from './pipes/keys.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PriorityPipe } from './pipes/priority.pipe';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { APIInterceptor } from './services/api-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LoginComponent } from './components/login/login.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TestActionsComponent } from './components/shared/test-actions/test-actions.component';
import { IssuesComponent } from './components/issues/issues.component';
import { TestConditionsService } from './services';
import { PreConditionsComponent } from './components/shared/pre-conditions/pre-conditions.component';
import { ExpectedResultsComponent } from './components/shared/expected-results/expected-results.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { TestModuleComponent } from './components/shared/test-module/test-module.component';

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
    TestCaseComponent,
    CreateTestCaseDialogComponent,
    CreateTestSuiteDialogComponent,
    CreateTestModuleDialogComponent,
    CreateTestRunDialogComponent,
    DeleteDialogComponent,
    ButtonComponent,
    KeysPipe,
    StatusPipe,
    PriorityPipe,
    TopnavComponent,
    LoginComponent,
    ReportsComponent,
    TestActionsComponent,
    IssuesComponent,
    PreConditionsComponent,
    ExpectedResultsComponent,
    ToolbarComponent,
    TestModuleComponent
  ],
  entryComponents: [CreateTestCaseDialogComponent, CreateTestSuiteDialogComponent, CreateTestModuleDialogComponent, CreateTestRunDialogComponent, DeleteDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot(jwtConf),
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'test-suites', pathMatch: 'full' },
      { path: 'test-suites/:id', component: TestSuiteComponent },
      { path: 'test-suites', component: TestSuitesComponent },
      { path: 'test-runs', component: TestRunsComponent },
      { path: 'test-runs/:id', component: TestRunComponent },
      { path: 'reports', component: ReportsComponent },
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
    ExpectedResultsService,
    TestConditionsService,
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
