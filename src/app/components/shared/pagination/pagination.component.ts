import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageSize: string;
  @Input() pageNumber: string;
  @Input() totalPages: string;
  @Output() callback: EventEmitter<string> = new EventEmitter()

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public first() {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['pageNumber'] = "1";

    this.router.navigateByUrl(urlTree);
    this.callback.emit("1");
  }

  public prev() {
    const urlTree = this.router.parseUrl(this.router.url);

    if (Number(this.pageNumber) > 1) {
      this.pageNumber = (Number(this.pageNumber) - 1).toString();
      urlTree.queryParams['pageNumber'] = this.pageNumber;

      this.router.navigateByUrl(urlTree);
      this.callback.emit(this.pageNumber);
    }
  }

  public next() {
    const urlTree = this.router.parseUrl(this.router.url);

    if (Number(this.pageNumber) < Number(this.totalPages)) {
      this.pageNumber = (Number(this.pageNumber) + 1).toString();
      urlTree.queryParams['pageNumber'] = this.pageNumber;

      this.router.navigateByUrl(urlTree);
      this.callback.emit(this.pageNumber);
    }
  }

  public last() {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['pageNumber'] = this.totalPages;

    this.router.navigateByUrl(urlTree);
    this.callback.emit(this.totalPages);
  }

}
