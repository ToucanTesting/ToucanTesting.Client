import { TestModule } from '@models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseUrl } from './base';
import 'rxjs/add/operator/map';

@Injectable()
export class TestModulesService {
    constructor(
        private authHttp: AuthHttp
    ) { }

    public getTestModule(testModule: TestModule): Observable<TestModule> {
        return this.authHttp.get(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`)
            .map(res => res.json());
    }

    public getTestModules(testSuiteId: number, beforeDate?: Date): Observable<TestModule[]> {
        if (beforeDate) {
            return this.authHttp.get(`${BaseUrl}test-suites/${testSuiteId}/test-modules?beforeDate=${beforeDate}`)
                .map(res => res.json());
        }
        return this.authHttp.get(`${BaseUrl}test-suites/${testSuiteId}/test-modules`)
            .map(res => res.json());
    }

    public createTestModule(testModule: TestModule): Observable<TestModule> {
        return this.authHttp.post(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules`, testModule)
            .map(res => res.json());
    }

    public deleteTestModule(testModule: TestModule) {
        return this.authHttp.delete(`${BaseUrl}test-suites/${testModule.testSuiteId}/test-modules/${testModule.id}`);
    }
}
