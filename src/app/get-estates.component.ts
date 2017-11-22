import { Component, OnInit } from '@angular/core';
import { Estate } from './data-model/estate';
import { EstateService } from './estate.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-get-estates',
   templateUrl: './get-estates.component.html',
})

export class GetEstatesComponent{
   estates = [];
   constructor( private estateService: EstateService, private router: Router) { }

   addEstate(estateNumber: string): void {
      this.estates.push(estateNumber);
   }

   getEstate(estateNumber: string): void {
      this.estateService.getEstateFromHttp(estateNumber);
   }

   getEstates(): void {
      for (const estate of this.estates) {
         this.estateService.getEstateFromHttp(estate);
      }
      this.estateService.getLookupsFromHttp();
   }

   removeEstate(estateNumber: string): void {
      this.estates.splice(this.estates.indexOf(estateNumber), 1);
   }
}
