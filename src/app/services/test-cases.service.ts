import { TestCase, TestModule } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestCasesService {
  constructor(private http: HttpClient) {

  }

  public createTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.post<TestCase>(`test-cases`, testCase);
  }

  public getTestCases(testModule: TestModule, beforeDate?: Date): Observable<TestCase[]> {
    if (beforeDate) {
      return this.http.get<TestCase[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases?beforeDate=${beforeDate}`)
    }
    return this.http.get<TestCase[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases`)
  }

  public getIssues(): Observable<TestCase[]> {
    return this.http.get<TestCase[]>(`test-cases?issuesOnly=true`)
  }


  public updateTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.put<TestCase>(`test-cases/${testCase.id}`, testCase)
  }

  public deleteTestCase(testCase: TestCase) {
    return this.http.delete(`test-cases/${testCase.id}`);
  }
}
