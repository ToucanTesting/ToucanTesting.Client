import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestRun } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class TestRunsService {
    constructor(private http: HttpClient) {

    }

    public createTestRun(testRun: TestRun): Observable<TestRun> {
        return this.http.post<TestRun>(`${environment.apiUrl}test-runs`, testRun);
    }

    public getTestRuns(pageNumber: string, pageSize: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}test-runs`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            },
            observe: 'response'
        });
    }

    public getTestRun(id: number, results: boolean = false): Observable<TestRun> {
        return this.http.get<TestRun>(`${environment.apiUrl}test-runs/${id}?results=${results}`);
    }

    public updateTestRun(testRun: TestRun): Observable<TestRun> {
        return this.http.put<TestRun>(`${environment.apiUrl}test-runs/${testRun.id}`, testRun)
    }

    public deleteTestRun(id: number) {
        return this.http.delete(`${environment.apiUrl}test-runs/${id}`);
    }
}
