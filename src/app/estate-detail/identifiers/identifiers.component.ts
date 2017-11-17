import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../../estate.service';
import { Estate } from '../../data-model/estate';

@Component({
   selector: 'app-estate-detail-ids',
   templateUrl: './identifiers.component.html',
})

export class IdentifiersComponent implements OnInit {
   estate: Estate;
   estateID: string;
   constructor(
      private estateService: EstateService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location
   ) { }
   ngOnInit(): void {
      // this.estate = this.router.routerState.root.parent(this.route)
      // .params.subscribe(params => {
      //   this.estateService.getEstate(+params['id']);
      // });
      this.estateID = this.route.parent.snapshot.paramMap.get('id');
      this.estateService.getEstate(+this.estateID).then(estate => this.estate = estate);
      // this.route.paramMap
      //    .switchMap((params: ParamMap) => this.estateService.getEstate(+params.get('id')))
      //    .subscribe(estate => this.estate = estate);
   }
}
