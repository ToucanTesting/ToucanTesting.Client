import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestAction, TestModule, TestCase } from '@models';

@Injectable()
export class TestActionsService {
    constructor(private http: HttpClient) {

    }

    public createTestAction(testAction: TestAction): Observable<TestAction> {
        return this.http.post<TestAction>(`test-actions`, testAction);
    }

    public getTestActions(testModule: TestModule, testCase: TestCase): Observable<TestAction[]> {
        return this.http.get<TestAction[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-actions`)
    }

    public updateTestAction(testAction: TestAction): Observable<TestAction> {
        return this.http.put<TestAction>(`test-actions/${testAction.id}`, testAction)
    }

    public deleteTestAction(id: number) {
        return this.http.delete(`test-actions/${id}`);
    }
}
