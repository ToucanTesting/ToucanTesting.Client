import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExpectedResult, TestModule, TestCase } from '@models';

@Injectable()
export class ExpectedResultsService {
    constructor(private http: HttpClient) {

    }

    public createExpectedResult(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.http.post<ExpectedResult>(`expected-results`, expectedResult);
    }

    public getTestResults(testModule: TestModule, testCase: TestCase): Observable<ExpectedResult[]> {
        return this.http.get<ExpectedResult[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/expected-results`)
    }

    public updateExpectedResult(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.http.put<ExpectedResult>(`expected-results/${expectedResult.id}`, expectedResult)
    }

    public deleteExpectedResult(id: number) {
        return this.http.delete(`expected-results/${id}`);
    }
}
