import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestIssue } from '@models';

@Injectable()
export class TestIssuesService {

  constructor(
    private http: HttpClient
  ) { }

  public createTestIssue(testIssue: TestIssue): Observable<TestIssue> {
    return this.http.post<TestIssue>(`test-issues`, testIssue);
}

  public getTestIssues(): Observable<TestIssue[]> {
    return this.http.get<TestIssue[]>(`test-issues`);
  }

  public deleteTestIssue(testIssue: TestIssue) {
    return this.http.delete(`test-issues/${testIssue.id}`);
  }
}
