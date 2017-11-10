import { Component, OnInit } from '@angular/core';
import { Estate } from './estate';
import { EstateService } from './estate.service';
import { Router } from '@angular/router';

@Component({
   selector: 'my-estates',
   templateUrl: './estates.component.html',
   styleUrls: [ './estates.component.css' ],
})

export class EstatesComponent implements OnInit{
   estates: Estate[];
   selectedEstate: Estate;
   constructor( private estateService: EstateService, private router: Router) { }
   getEstates(): void {
      this.estateService.getEstates().then(estates => this.estates = estates);
   }
   ngOnInit(): void {
      this.getEstates();
   }
   onSelect(estate: Estate): void {
      this.selectedEstate = estate;
   }
   gotoDetail(): void {
      this.router.navigate(['/detail', this.selectedEstate.id]);
   }
   addEstate(id: number, firstName: string, lastName: string): void {
      firstName = firstName.trim();
      lastName = lastName.trim();
      if (!lastName) { return; }
      this.estateService.saveEstate(id, firstName, lastName);
      this.getEstates();
      this.selectedEstate = null;
   }
   delete(estate: Estate): void {
      this.estateService.delete(estate);
      this.getEstates();
      this.selectedEstate = null;
   }
}