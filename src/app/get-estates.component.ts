import { Component, OnInit } from '@angular/core';
import { Estate } from './estate';
import { EstateService } from './estate.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-get-estates',
   templateUrl: './get-estates.component.html',
   styleUrls: [ './get-estates.component.css' ],
})

export class GetEstatesComponent{
   constructor( private estateService: EstateService, private router: Router) { }
   getEstate(estateNumber: string): void {
      this.estateService.getEstateFromHttp(estateNumber);
   }
   
}