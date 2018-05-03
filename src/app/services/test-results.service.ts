import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TestResult, TestCase } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class TestResultsService {
    constructor(private http: HttpClient) {

    }

    public createTestResult(testResult: TestResult): Observable<TestResult> {
        return this.http.post<TestResult>(`${environment.apiUrl}test-results`, testResult);
    }

    public getTestResults(testRunId: number): Observable<TestResult[]> {
        return this.http.get<TestResult[]>(`${environment.apiUrl}test-results?testRunId=${testRunId}`);
    }

    public updateTestResult(testResult: TestResult): Observable<TestResult> {
        return this.http.put<TestResult>(`${environment.apiUrl}test-results/${testResult.id}`, testResult);
    }
}
