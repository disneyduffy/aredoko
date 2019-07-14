import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item }              from './item';
import { Injectable }        from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 11, name: '乾電池 単1形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 12, name: '乾電池 単2形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 13, name: '乾電池 単3形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 14, name: '乾電池 単4形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 15, name: '乾電池 単5形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 16, name: '乾電池 単6形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 17, name: '乾電池 単7形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 18, name: '乾電池 単8形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 19, name: '乾電池 単9形', location: '廊下の物入れ', memo: 'ストックが切れている' },
      { id: 20, name: '乾電池 単0形', location: '廊下の物入れ', memo: 'ストックが切れている' }
    ];
    return {items};
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}
