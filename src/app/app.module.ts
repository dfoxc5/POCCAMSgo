import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EstateDetailComponent } from './estate-detail.component';
import { AppComponent } from './app.component';
import { EstatesComponent } from './estates.component';
import { EstateService } from './estate.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:        [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations:   [ AppComponent, EstateDetailComponent, EstatesComponent ],
  providers:      [ EstateService ],
  bootstrap:      [ AppComponent ]
})

export class AppModule { }



