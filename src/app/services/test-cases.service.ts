import { TestCase, TestModule, TestIssue } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class TestCasesService {
  constructor(private http: HttpClient) {

  }

  public createTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.post<TestCase>(`${environment.apiUrl}test-cases`, testCase);
  }

  public getTestCases(testModule: TestModule, beforeDate?: Date): Observable<TestCase[]> {
    if (beforeDate) {
      return this.http.get<TestCase[]>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases?beforeDate=${beforeDate}`)
    }
    return this.http.get<TestCase[]>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases`)
  }

  public getIssues(testCaseId: number): Observable<TestIssue[]> {
    return this.http.get<TestIssue[]>(`${environment.apiUrl}test-cases/${testCaseId}/test-issues`)
  }

  public updateTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.put<TestCase>(`${environment.apiUrl}test-cases/${testCase.id}`, testCase)
  }

  public duplicateTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.post<TestCase>(`${environment.apiUrl}test-cases/${testCase.id}`, testCase);
  }

  public deleteTestCase(testCase: TestCase) {
    return this.http.delete(`${environment.apiUrl}test-cases/${testCase.id}`);
  }
}
