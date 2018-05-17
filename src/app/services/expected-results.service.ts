import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpectedResult, TestModule, TestCase } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class ExpectedResultsService {
    constructor(private http: HttpClient) {

    }

    public createExpectedResult(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.http.post<ExpectedResult>(`${environment.apiUrl}expected-results`, expectedResult);
    }

    public getTestResults(testModule: TestModule, testCase: TestCase): Observable<ExpectedResult[]> {
        return this.http.get<ExpectedResult[]>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/expected-results`)
    }

    public updateExpectedResult(expectedResult: ExpectedResult): Observable<ExpectedResult> {
        return this.http.put<ExpectedResult>(`${environment.apiUrl}expected-results/${expectedResult.id}`, expectedResult)
    }

    public deleteExpectedResult(id: number) {
        return this.http.delete(`${environment.apiUrl}expected-results/${id}`);
    }
}
