import { TestModule } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class TestModulesService {
    constructor(private http: HttpClient) { }

    public getTestModule(testModule: TestModule): Observable<TestModule> {
        return this.http.get<TestModule>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`)
    }

    public getTestModules(testSuiteId: number, beforeDate?: Date): Observable<TestModule[]> {
        if (beforeDate) {
            return this.http.get<TestModule[]>(`${environment.apiUrl}test-suites/${testSuiteId}/test-modules?beforeDate=${beforeDate}`)
        }
        return this.http.get<TestModule[]>(`${environment.apiUrl}test-suites/${testSuiteId}/test-modules`)
    }

    public getTestReport(testSuiteId: number, beforeDate: Date, isReport = true): Observable<TestModule[]> {
        return this.http.get<TestModule[]>(`${environment.apiUrl}test-suites/${testSuiteId}/test-modules?beforeDate=${beforeDate}&isReport=${isReport}`)
    }

    public createTestModule(testModule: TestModule): Observable<TestModule> {
        return this.http.post<TestModule>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules`, testModule);
    }

    public updateTestModule(testModule: TestModule): Observable<TestModule> {
        return this.http.put<TestModule>(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`, testModule)
    }

    public deleteTestModule(testModule: TestModule) {
        return this.http.delete(`${environment.apiUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`);
    }
}
