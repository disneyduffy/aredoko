import { Component, OnInit }                             from '@angular/core';

import { Observable, Subject }                           from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Item }                                          from '../item';
import { ItemService }                                   from '../item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: [ './item-search.component.css' ]
})
export class ItemSearchComponent implements OnInit {
  items$: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemService) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.items$ = this.searchTerms
    .pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.itemService.searchItems(term)),
    );
  }
}