import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestIssue } from '@models';
import { environment } from 'environments/environment';

@Injectable()
export class TestIssuesService {

  constructor(
    private http: HttpClient
  ) { }

  public createTestIssue(testIssue: TestIssue): Observable<TestIssue> {
    return this.http.post<TestIssue>(`${environment.apiUrl}test-issues`, testIssue);
}

  public getTestIssues(): Observable<TestIssue[]> {
    return this.http.get<TestIssue[]>(`${environment.apiUrl}test-issues`);
  }

  public updateTestIssue(testIssueId: number, testIssue: TestIssue): Observable<TestIssue> {
    return this.http.put<TestIssue>(`${environment.apiUrl}test-issues/${testIssueId}`, testIssue);
  }

  public deleteTestIssue(testIssueId: number) {
    return this.http.delete(`${environment.apiUrl}test-issues/${testIssueId}`);
  }
}
