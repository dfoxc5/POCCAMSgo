import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../../estate.service';
import { Estate } from '../../data-model/estate';

@Component({
   selector: 'app-estate-detail-casenotes',
   templateUrl: './casenotes.component.html',
})

export class CasenotesComponent implements OnInit {
   estate: Estate;
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location
   ) { }
   ngOnInit(): void {
      this.route.paramMap
         .switchMap((params: ParamMap) => this.estateService.getEstate(+params.get('id')))
         .subscribe(estate => this.estate = estate);
   }
}
