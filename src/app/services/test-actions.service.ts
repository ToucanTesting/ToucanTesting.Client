import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestAction, TestModule, TestCase } from '@models';

@Injectable()
export class TestActionsService {
    constructor(private http: HttpClient) {

    }

    public getTestActions(testModule: TestModule, testCase: TestCase): Observable<TestAction[]> {
        return this.http.get<TestCase[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-actions`)
    }

    public createTestAction(testAction: TestAction): Observable<TestAction> {
        return this.http.post<TestAction>(`test-actions`, testAction);
    }

    // public getTestActions(): Observable<TestAction[]> {
    //     return this.http.get<TestAction[]>(`${getBaseUrl()}api/test-actions`);
    // }

    // public getTestAction(id: number): Observable<TestAction> {
    //     return this.http.get<TestAction>(`${getBaseUrl()}api/test-actions/${id}`);
    // }

    // public updateTestAction(testAction: TestAction): Observable<TestAction> {
    //     return this.http.put<TestAction>(`${getBaseUrl()}api/test-actions/${testAction.id}`, testAction)
    // }

    // public deleteTestAction(id: number) {
    //     return this.http.delete(`${getBaseUrl()}api/test-actions/${id}`);
    // }
}
