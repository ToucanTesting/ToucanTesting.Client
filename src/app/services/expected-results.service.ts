import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExpectedResult, TestModule, TestCase } from '@models';

@Injectable()
export class ExpectedResultsService {
    constructor(private http: HttpClient) {

    }

    public getTestResults(testModule: TestModule, testCase: TestCase): Observable<ExpectedResult[]> {
        return this.http.get<ExpectedResult[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/expected-results`)
    }
    
}
