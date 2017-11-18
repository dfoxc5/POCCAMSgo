import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../../estate.service';
import { Estate } from '../../data-model/estate';
import { Identifier } from '../../data-model/identifiers';

@Component({
   selector: 'app-estate-detail-ids',
   templateUrl: './identifiers.component.html',
})

export class IdentifiersComponent implements OnInit {
   estate: Estate;
   estateID: string;
   selectedId: Identifier;
   date: Date;
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location,
      private datepipe: DatePipe,
   ) { }
   ngOnInit(): void {
      this.estateID = this.route.parent.snapshot.paramMap.get('id');
      this.estateService.getEstate(+this.estateID).then(estate => this.estate = estate);
   }

   getID(id: Identifier) {
      this.selectedId = id;
   }

   getDate(oldDate: string): string {
      this.date = new Date(oldDate);
      let newDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      return newDate;
   }
}
