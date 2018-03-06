import { TestCondition, TestModule, TestCase } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestConditionsService {
    constructor(private authHttp: AuthHttp) {

    }

    public createTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.authHttp.post(`${BaseUrl}test-conditions`, testCondition)
            .map(res => res.json());
    }

    public updateTestCondition(testCondition: TestCondition): Observable<TestCondition> {
        return this.authHttp.put(`${BaseUrl}test-conditions/${testCondition.id}`, testCondition)
            .map(res => res.json());
    }

    // public deleteTestCondition(id: number) {
    //     return this.http.delete(`${getBaseUrl()}api/test-conditions/${id}`);
    // }
}
