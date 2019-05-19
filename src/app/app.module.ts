import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';

import { AppComponent }        from './app.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsComponent }      from './items/items.component';
import { MessagesComponent }   from './messages/messages.component';

import { AppRoutingModule }    from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemDetailComponent,
    ItemsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
