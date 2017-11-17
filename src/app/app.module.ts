import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { AppComponent } from './app.component';
import { EstatesComponent } from './estates.component';
import { EstateService } from './estate.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GetEstatesComponent } from './get-estates.component';
import { IdentifiersComponent } from './estate-detail/identifiers/identifiers.component';
import { NamesComponent } from './estate-detail/names/names.component';
import { CasenotesComponent } from './estate-detail/casenotes/casenotes.component';

@NgModule({
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
   ],
   declarations: [
      AppComponent,
      EstateDetailComponent,
      EstatesComponent,
      GetEstatesComponent,
      IdentifiersComponent,
      NamesComponent,
      CasenotesComponent
   ],
   providers: [
      EstateService
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }



