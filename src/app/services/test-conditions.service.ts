import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestCondition, TestModule, TestCase } from '@models';
import { TestCondition } from '../models';

@Injectable()
export class TestConditionsService {
    constructor(private http: HttpClient) {

    }

    public createTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.http.post<TestCondition>(`test-conditions`, testCondition);
    }

    public getTestConditions(testModule: TestModule, testCase: TestCase): Observable<TestCondition[]> {
        return this.http.get<TestCondition[]>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}/test-cases/${testCase.id}/test-conditions`)
    }

    public updateTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.http.put<TestCondition>(`test-conditions/${testCondition.id}`, testCondition)
    }

    public deleteTestCondition(id: number) {
        return this.http.delete(`test-conditions/${id}`);
    }
}
