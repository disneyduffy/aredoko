import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of }          from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';

import { Item }                    from './item';
import { MessageService }          from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items'; // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** サーバーからものを取得する */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(items => this.log('一覧を取得しました')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** IDによりものを取得する。見つからなかった場合は404を返却する。 */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
    .pipe(
      tap(_ => this.log(`id=${id} を取得しました`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /* 検索語を含むものを取得する */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の配列を返す
      return of([]);
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`"${term}" を検索しました`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }

  /** POST: サーバーに新しいものを登録する */
  addItem (item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions)
    .pipe(
      tap((newItem: Item) => this.log(`id=${newItem.id} を登録しました`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: サーバーからものを削除 */
  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`id=${id} を削除しました`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: サーバー上でものを更新 */
  updateItem (item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, item, httpOptions)
    .pipe(
      tap(_ => this.log(`id=${item.id} を更新しました`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);

    };
  }

  /** ItemServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}
