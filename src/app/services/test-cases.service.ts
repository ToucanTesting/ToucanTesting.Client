import { TestCase, TestModule } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestCasesService {
  constructor(
    private authHttp: AuthHttp
  ) { }

  public getTestCases(testModule: TestModule, beforeDate?: Date): Observable<TestCase[]> {
    if (beforeDate) {
      return this.authHttp.get(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases?beforeDate=${beforeDate}`)
        .map(res => res.json());

    }
    return this.authHttp.get(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases`)
      .map(res => res.json());
  }

  public addTestCase(testCase: TestCase): Observable<TestCase> {
    return this.authHttp.post(`test-cases`, testCase)
      .map(res => res.json());
  }

  public updateTestCase(testCase: TestCase): Observable<TestCase> {
    return this.authHttp.put(`${BaseUrl}test-cases/${testCase.id}`, testCase)
      .map(res => res.json());
  }

  public deleteTestCase(id: number) {
    return this.authHttp.delete(`${BaseUrl}test-cases/${id}`);
  }
}
