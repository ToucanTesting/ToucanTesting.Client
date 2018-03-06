import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExpectedResult, TestModule, TestCase } from '@models';

@Injectable()
export class ExpectedResultsService {
    constructor(private http: HttpClient) {

    }

    public createTestCondition(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.http.post<ExpectedResult>(`expected-results`, expectedResult);
    }

    // public getTestConditions(testModule: TestModule, testCase: TestCase): Observable<TestCondition[]> {
    //     return this.http.get<TestCase[]>(`${getBaseUrl()}api/test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-conditions`)
    // }


    // public updateTestCondition(expectedResult: TestCondition): Observable<TestCondition> {
    //     return this.http.put<TestCondition>(`${getBaseUrl()}api/expected-results/${expectedResult.id}`, expectedResult)
    // }

    // public deleteTestCondition(id: number) {
    //     return this.http.delete(`${getBaseUrl()}api/expected-results/${id}`);
    // }
}
