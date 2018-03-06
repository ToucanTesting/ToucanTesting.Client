import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TestResult, TestCase } from '@models';

@Injectable()
export class TestResultsService {
    constructor(private http: HttpClient) {

    }

    public getTestResults(testRunId: number): Observable<TestResult[]> {
        return this.http.get<TestResult[]>(`test-results?testRunId=${testRunId}`);
    }

    public upsertTestResult(results: TestResult[]): Observable<TestResult[]> {
        return this.http.put<TestResult[]>(`test-results`, results);
    }
}
