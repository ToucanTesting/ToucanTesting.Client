import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestIssue } from '@models';
import { environment } from 'environments/environment';
import { Pagination } from 'app/interfaces/pagination.interface';

@Injectable()
export class TestIssuesService {

  constructor(
    private http: HttpClient
  ) { }

  public createTestIssue(testIssue: TestIssue): Observable<TestIssue> {
    return this.http.post<TestIssue>(`${environment.apiUrl}test-issues`, testIssue);
  }

  public getTestIssues(pagination?: Pagination, searchText?: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}test-issues`, {
      params: {
        pageNumber: (pagination && pagination.pageNumber) ? pagination.pageNumber : '0',
        pageSize: (pagination && pagination.pageSize) ? pagination.pageSize : '0',
        searchText: (searchText) ? searchText : ''
      },
      observe: 'response'
    });
  }

  public updateTestIssue(testIssueId: number, testIssue: TestIssue): Observable<TestIssue> {
    return this.http.put<TestIssue>(`${environment.apiUrl}test-issues/${testIssueId}`, testIssue);
  }

  public deleteTestIssue(testIssueId: number) {
    return this.http.delete(`${environment.apiUrl}test-issues/${testIssueId}`);
  }
}
