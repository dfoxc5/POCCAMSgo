import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../estate.service';
import { Estate } from '../data-model/estate';
import { Lookups } from '../data-model/lookups';
import { Identifier } from '../data-model/identifiers';

@Component({
   selector: 'app-estate-detail',
   templateUrl: './estate-detail.component.html',
   styleUrls: ['./estate-detail.component.css'],
   providers: [EstateService]
})

export class EstateDetailComponent implements OnInit {
   estate: Estate;
   savedEstate: Estate;
   selectedTab = '1';
   idTypes: Lookups[];
   newId = new Identifier;
   constructor(
      private estateService: EstateService,
      private route: ActivatedRoute,
      private location: Location
   ) { }
   ngOnInit(): void {
      this.route.paramMap
         .switchMap((params: ParamMap) => this.estateService.getEstate(+params.get('id')))
         .subscribe(estate => {
            this.estate = estate;
            this.estateService.setSession(estate);
         });
      this.estateService.getLookups('IDTYP').then(idTypes => this.idTypes = idTypes);
   }
   goBack(): void {
      this.location.back();
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
      this.estate.identifiers.push(this.newId);
      this.estateService.update(this.estate);
      // console.log(this.newId);
   }
   post(): void {
      this.estateService.postEstateToHttp(this.estate);
      this.estateService.update(this.estate);
   }
   selectTab(id: string) {
      this.selectedTab = id;
   }

   findLowestId(identifiers: Identifier[]): number {
      let lowId = 0;
      for (const id in identifiers) {
         if (+id < lowId) {
            lowId = +id;
         }
      }
      return lowId;
   }
}
