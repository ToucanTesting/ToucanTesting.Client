import { TestAction, TestModule, TestCase } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestActionsService {
    constructor(private authHttp: AuthHttp) {

    }

    public getTestActions(testModule: TestModule, testCase: TestCase): Observable<TestAction[]> {
        return this.authHttp.get(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-actions`)
            .map(res => res.json());
    }

    public createTestAction(testAction: TestAction): Observable<TestAction> {
        return this.authHttp.post(`${BaseUrl}test-actions`, testAction)
            .map(res => res.json());
    }

    public updateTestAction(testAction: TestAction): Observable<TestAction> {
        return this.authHttp.put(`${BaseUrl}test-actions/${testAction.id}`, testAction)
            .map(res => res.json());
    }

    // public deleteTestAction(id: number) {
    //     return this.http.delete(`${getBaseUrl()}api/test-actions/${id}`);
    // }
}
