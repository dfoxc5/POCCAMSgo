import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from './estate.service';
import { Estate } from './estate';

@Component({
   selector: 'app-estate-detail',
   templateUrl: './estate-detail.component.html',
   styleUrls: ['./estate-detail.component.css'],
})

export class EstateDetailComponent implements OnInit {
   estate: Estate;
   savedEstate: Estate;
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
   goBack(): void {
      this.location.back();
   }
   save(): void {
      this.estateService.update(this.estate).then(() => this.goBack());
   }
   post(): void {
      alert(this.estate.estateNumber);
      this.estateService.postEstateToHttp(this.estate);
      alert(this.estate.courtCaseNo);
      this.estateService.update(this.estate);
      alert('It worked');
   }
}
