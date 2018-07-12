import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../interfaces/pagination.interface';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageData: Pagination;
  @Output() callback: EventEmitter<Pagination> = new EventEmitter()

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public changePageSize(pageSize: string): void {
    this.pageData.pageSize = pageSize;
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['pageSize'] = pageSize;

    this.router.navigateByUrl(urlTree);
    this.callback.emit(this.pageData);
  }

  public first(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    this.pageData.pageNumber = "1";
    urlTree.queryParams['pageNumber'] = this.pageData.pageNumber;

    this.router.navigateByUrl(urlTree);
    this.callback.emit(this.pageData);
  }

  public prev(): void {
    const urlTree = this.router.parseUrl(this.router.url);

    if (Number(this.pageData.pageNumber) > 1) {
      this.pageData.pageNumber = (Number(this.pageData.pageNumber) - 1).toString();
      urlTree.queryParams['pageNumber'] = this.pageData.pageNumber;

      this.router.navigateByUrl(urlTree);
      this.callback.emit(this.pageData);
    }
  }

  public next(): void {
    const urlTree = this.router.parseUrl(this.router.url);

    if (Number(this.pageData.pageNumber) < Number(this.pageData.totalPages)) {
      this.pageData.pageNumber = (Number(this.pageData.pageNumber) + 1).toString();
      urlTree.queryParams['pageNumber'] = this.pageData.pageNumber;

      this.router.navigateByUrl(urlTree);
      this.callback.emit(this.pageData);
    }
  }

  public last(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    this.pageData.pageNumber = this.pageData.totalPages;
    urlTree.queryParams['pageNumber'] = this.pageData.totalPages;

    this.router.navigateByUrl(urlTree);
    this.callback.emit(this.pageData);
  }

}
