import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestRun } from '@models';

@Injectable()
export class TestRunsService {
    constructor(private http: HttpClient) {

    }

    public createTestRun(testRun: TestRun): Observable<TestRun> {
        return this.http.post<TestRun>(`test-runs`, testRun);
    }

    public getTestRuns(): Observable<TestRun[]> {
        return this.http.get<TestRun[]>(`test-runs`);
    }

    public getTestRun(id: number, results: boolean = false): Observable<TestRun> {
        return this.http.get<TestRun>(`test-runs/${id}?results=${results}`);
    }

    public updateTestRun(testRun: TestRun): Observable<TestRun> {
        return this.http.put<TestRun>(`test-runs/${testRun.id}`, testRun)
    }

    public deleteTestRun(id: number) {
        return this.http.delete(`test-runs/${id}`);
    }
}
