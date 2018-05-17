import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestCondition, TestModule, TestCase } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class TestConditionsService {
    constructor(private http: HttpClient) {

    }

    public createTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.http.post<TestCondition>(`${environment.apiUrl}test-conditions`, testCondition);
    }

    public getTestConditions(testModule: TestModule, testCase: TestCase): Observable<TestCondition[]> {
        return this.http.get<TestCondition[]>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-conditions`)
    }

    public updateTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.http.put<TestCondition>(`${environment.apiUrl}test-conditions/${testCondition.id}`, testCondition)
    }

    public deleteTestCondition(id: number) {
        return this.http.delete(`${environment.apiUrl}test-conditions/${id}`);
    }
}
