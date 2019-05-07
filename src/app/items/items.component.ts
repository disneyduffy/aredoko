import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  item: Item = {
    id: 1,
    name: '乾電池',
    location: '廊下の物入れ',
    memo: '新品のストックが切れているので買い足す'
  };

  constructor() { }

  ngOnInit() {
  }

}
