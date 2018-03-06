import { TestRun } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestRunsService {
    constructor(private authHttp: AuthHttp) {

    }

    public createTestRun(testRun: TestRun): Observable<TestRun> {
        return this.authHttp.post(`${BaseUrl}test-runs`, testRun)
            .map(res => res.json());
    }

    public getTestRuns(): Observable<TestRun[]> {
        return this.authHttp.get(`${BaseUrl}test-runs`)
            .map(res => res.json());
    }

    public getTestRun(id: number): Observable<TestRun> {
        return this.authHttp.get(`${BaseUrl}test-runs/${id}`)
            .map(res => res.json());
    }

    public updateTestRun(testRun: TestRun): Observable<TestRun> {
        return this.authHttp.put(`${BaseUrl}test-runs/${testRun.id}`, testRun)
            .map(res => res.json());
    }

    public deleteTestRun(id: number) {
        return this.authHttp.delete(`${BaseUrl}test-runs/${id}`)
            .map(res => res.json());
    }
}
