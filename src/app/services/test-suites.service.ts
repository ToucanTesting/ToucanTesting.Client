import { TestSuite } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestSuitesService {
    constructor(
        private authHttp: AuthHttp
    ) { }

    public createTestSuites(testSuite: TestSuite): Observable<TestSuite> {
        return this.authHttp.post(`${BaseUrl}test-suites`, testSuite)
            .map(res => res.json());
    }

    public getTestSuites(): Observable<TestSuite[]> {
        return this.authHttp.get(`${BaseUrl}test-suites`)
            .map(res => res.json());
    }

    public getTestSuite(id: number): Observable<TestSuite> {
        return this.authHttp.get(`${BaseUrl}test-suites/${id}`)
            .map(res => res.json());
    }

    public updateTestSuite(testSuite: TestSuite): Observable<TestSuite> {
        return this.authHttp.put(`${BaseUrl}test-suites/${testSuite.id}`, testSuite)
            .map(res => res.json());
    }

    public deleteTestSuite(id: number) {
        return this.authHttp.delete(`${BaseUrl}test-suites/${id}`);
    }
}
