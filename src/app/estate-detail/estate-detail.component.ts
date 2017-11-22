import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../estate.service';
import { Estate } from '../data-model/estate';
import { Lookups } from '../data-model/lookups';

@Component({
   selector: 'app-estate-detail',
   templateUrl: './estate-detail.component.html',
   styleUrls: ['./estate-detail.component.css'],
   providers: [EstateService]
})

export class EstateDetailComponent implements OnInit {
   estate: Estate;
   savedEstate: Estate;
   selectedTab: string;
   idTypes: Lookups[];
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location,
      private router: Router
   ) { }
   ngOnInit(): void {
      this.route.paramMap
         .switchMap((params: ParamMap) => this.estateService.getEstate(+params.get('id')))
         .subscribe(estate => {
            this.estate = estate;
            this.estateService.setSession(estate);
         });
      this.selectedTab = window.location.href.split('/')[5];
      this.estateService.getLookups('IDTYP').then(idTypes => this.idTypes = idTypes);
      this.router.events.subscribe((event) => this.selectTab());
   }
   goBack(): void {
      this.location.back();
   }
   post(): void {
      this.estateService.postEstateToHttp(this.estate);
      this.estateService.update(this.estate);
   }
   selectTab() {
      this.selectedTab = window.location.href.split('/')[5];
   }
}
