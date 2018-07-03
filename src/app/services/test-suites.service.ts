import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestSuite } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class TestSuitesService {
    constructor(private http: HttpClient) {

    }

    public createTestSuites(testSuite: TestSuite): Observable<TestSuite> {
        return this.http.post<TestSuite>(`${environment.apiUrl}test-suites`, testSuite);
    }

    public getTestSuites(): Observable<TestSuite[]> {
        return this.http.get<TestSuite[]>(`${environment.apiUrl}test-suites`);
    }

    public getTestSuite(id: number): Observable<TestSuite> {
        return this.http.get<TestSuite>(`${environment.apiUrl}test-suites/${id}`);
    }

    public updateTestSuite(testSuite: TestSuite): Observable<TestSuite> {
        return this.http.put<TestSuite>(`${environment.apiUrl}test-suites/${testSuite.id}`, testSuite)
    }

    public deleteTestSuite(id: number) {
        return this.http.delete(`${environment.apiUrl}test-suites/${id}`);
    }

    public exportToCsv(id: number) {
        return this.http.get(`${environment.apiUrl}test-suites/${id}/export`, {responseType: "blob"});
    }
}
