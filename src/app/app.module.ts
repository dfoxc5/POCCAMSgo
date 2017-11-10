import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EstateDetailComponent } from './estate-detail.component';
import { AppComponent } from './app.component';
import { EstatesComponent } from './estates.component';
import { EstateService } from './estate.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { GetEstatesComponent } from './get-estates.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
                  HttpClientInMemoryWebApiModule.forRoot(
                    InMemoryDataService, { dataEncapsulation: false }
                  ) 
                ],
  declarations: [ AppComponent, EstateDetailComponent, EstatesComponent, MessagesComponent, GetEstatesComponent ],
  providers:    [ EstateService, MessageService ],
  bootstrap:    [ AppComponent ]

@NgModule({
  imports:        [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
  declarations:   [ AppComponent, EstateDetailComponent, EstatesComponent ],
  providers:      [ EstateService ],
  bootstrap:      [ AppComponent ]
})

export class AppModule { }



