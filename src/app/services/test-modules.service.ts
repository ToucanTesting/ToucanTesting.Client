import { TestModule } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestModulesService {
    constructor(private http: HttpClient) { }

    public getTestModule(testModule: TestModule): Observable<TestModule> {
        return this.http.get<TestModule>(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`)
    }

    public getTestModules(testSuiteId: number, beforeDate?: Date): Observable<TestModule[]> {
        if (beforeDate) {
            return this.http.get<TestModule[]>(`test-suites/${testSuiteId}/test-modules?beforeDate=${beforeDate}`)
        }
        return this.http.get<TestModule[]>(`test-suites/${testSuiteId}/test-modules`)
    }

    public createTestModule(testModule: TestModule): Observable<TestModule> {
        return this.http.post<TestModule>(`test-suites/${testModule.testSuiteId}/test-modules`, testModule);
    }

    public deleteTestModule(testModule: TestModule) {
        return this.http.delete(`test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`);
    }
}
