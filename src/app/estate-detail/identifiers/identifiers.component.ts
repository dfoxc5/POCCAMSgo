import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../../estate.service';
import { Estate } from '../../data-model/estate';
import { Identifier } from '../../data-model/identifiers';
import { Lookups } from '../../data-model/lookups';

@Component({
   selector: 'app-estate-detail-ids',
   templateUrl: './identifiers.component.html',
})

export class IdentifiersComponent implements OnInit {
   estate: Estate;
   estateID: string;
   selectedId: Identifier;
   date: Date;
   idTypes: Lookups[];
   newId = new Identifier;
   idsToRemove = [];
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location,
      private datepipe: DatePipe,
   ) { }
   ngOnInit(): void {
      this.estate = this.estateService.getSession();
      this.estateService.getLookups('IDTYP').then(idTypes => this.idTypes = idTypes);
   }

   getID(id: Identifier) {
      this.selectedId = JSON.parse(JSON.stringify(id));
   }

   getDate(oldDate: string): string {
      this.date = new Date(oldDate);
      const newDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      return newDate;
   }

   getDescription(appCode: string): string {
      if (this.idTypes) {
         for (const code of this.idTypes) {
            if (code.appCode === appCode) {
               return code.description;
            }
         }
      }
   }
   saveID(IDtoSave) {
      const index = this.estate.identifiers.findIndex(identifier => identifier.id === this.selectedId.id);
      this.estate.identifiers[index] = IDtoSave;
      this.estateService.update(this.estate);
   }

   findIndexToUpdate(IDtoSave) {
      return IDtoSave.id === this;
   }

   add(idType: string, issueDate: string, clidNum: string,
      issAuth: string, expDate: string, verified: boolean,
      comments: string): void {
      const lowestId = this.findLowestId(this.estate.identifiers);
      this.newId.id = lowestId;
      this.newId.idtypLookup = idType;
      this.newId.issueDate = issueDate;
      this.newId.clidNumber = clidNum;
      this.newId.issuingAuthority = issAuth;
      this.newId.expirationDate = expDate;
      this.newId.verified = verified;
      this.newId.comments = comments;
      this.newId.enteredByUser = true;
      this.estate.identifiers.push(this.newId);
      this.estateService.update(this.estate);
   }

   findLowestId(identifiers: Identifier[]): number {
      let lowId = 0;
      for (const id of identifiers) {
         if (+id.id <= lowId) {
            lowId = +id.id - 1;
         }
      }
      return lowId;
   }

   checkbox(id: number): void {
      let add = true;
      if (this.idsToRemove.length > 0) {
         for (const toRemove of this.idsToRemove) {
            if (id === +toRemove) {
               const index = this.idsToRemove.findIndex(thisId => +thisId === id);
               this.idsToRemove.splice(index, 1);
               add = false;
            }
         }
      }
      if (add) {
         this.idsToRemove.push(id);
      }
      console.log(this.idsToRemove);
   }

   removeIds(): void {
      console.log(this.estate.identifiers);
      if (this.idsToRemove.length > 0) {
         for (const toRemove of this.idsToRemove) {
            const index = this.estate.identifiers.findIndex(identifier => +identifier.id === toRemove);
            this.estate.identifiers.splice(index, 1);
            console.log(this.estate.identifiers);
            this.estateService.update(this.estate);
         }
      }
   }

}
