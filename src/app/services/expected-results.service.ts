import { ExpectedResult, TestModule, TestCase } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpectedResultsService {
    constructor(private authHttp: AuthHttp) {

    }

    public createTestCondition(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.authHttp.post(`${BaseUrl}expected-results`, expectedResult)
            .map(res => res.json());
    }

    // public getTestConditions(testModule: TestModule, testCase: TestCase): Observable<TestCondition[]> {
    //     return this.authHttp.get<TestCase[]>(`${getBaseUrl()}api/test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-conditions`)
    // }


    // public updateTestCondition(expectedResult: TestCondition): Observable<TestCondition> {
    //     return this.authHttp.put<TestCondition>(`${getBaseUrl()}api/expected-results/${expectedResult.id}`, expectedResult)
    // }

    // public deleteTestCondition(id: number) {
    //     return this.authHttp.delete(`${getBaseUrl()}api/expected-results/${id}`);
    // }
}
