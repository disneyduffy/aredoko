import { Injectable }     from '@angular/core';

import { Observable, of } from 'rxjs';

import { Item }           from './item';
import { ITEMS }          from './mock-items';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private messageService: MessageService) { }

  getItems(): Observable<Item[]> {
    this.messageService.add('ItemService: 一覧を取得しました');
    return of(ITEMS);
  }

  getItem(id: number): Observable<Item> {
    this.messageService.add(`ItemService: id=${id} を取得しました`);
    return of(ITEMS.find(item => item.id === id));
  }

}
