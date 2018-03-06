import { TestResult, TestCase } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestResultsService {
    constructor(private authHttp: AuthHttp) {

    }

    public getTestResults(testRunId: number): Observable<TestResult[]> {
        return this.authHttp.get(`${BaseUrl}test-results?testRunId=${testRunId}`)
            .map(res => res.json());
    }

    public upsertTestResult(result: TestResult): Observable<TestResult> {
        return this.authHttp.put(`${BaseUrl}test-results`, result)
            .map(res => res.json());
    }
}
