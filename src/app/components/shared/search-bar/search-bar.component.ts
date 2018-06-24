import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchText: string;
  @Output() callback: EventEmitter<string> = new EventEmitter()

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchText = this.route.snapshot.queryParamMap.get('searchText');

    if(this.searchText && this.searchText.length > 0) {
      this.callback.emit(this.searchText)
    }
  }

  search(searchText: string) {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['searchText'] = searchText;

    this.router.navigateByUrl(urlTree);
    this.callback.emit(searchText)
  }

}
