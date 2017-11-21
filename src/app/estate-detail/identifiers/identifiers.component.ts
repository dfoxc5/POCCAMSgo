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
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location,
      private datepipe: DatePipe,
   ) { }
   ngOnInit(): void {
      // this.estateID = this.route.parent.snapshot.paramMap.get('id');
      this.estate = this.estateService.getSession();
      // this.estateService.getEstate(+this.estateID).then(estate => this.estate = estate);
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

}
