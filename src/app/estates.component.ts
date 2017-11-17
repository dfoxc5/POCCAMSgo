import { Component, OnInit } from '@angular/core';
import { Estate } from './data-model/estate';
import { EstateService } from './estate.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-my-estates',
   templateUrl: './estates.component.html',
   styleUrls: [ './estates.component.css' ],
})

export class EstatesComponent implements OnInit{
   estates: Estate[];
   selectedEstate: Estate;
   estateToSave: Estate;
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
   gotoDetail(estate): void {
      this.router.navigate(['/detail', estate.id]);
   }
   addEstate(id: number, estateNumber: string, courtCaseNo: string): void {
      estateNumber = estateNumber.trim();
      courtCaseNo = courtCaseNo.trim();
      if (!estateNumber) { return; }
      this.estateToSave.id = id;
      this.estateToSave.estateNumber = estateNumber;
      this.estateToSave.courtCaseNo = courtCaseNo;
      this.estateService.saveEstate(this.estateToSave);
      this.getEstates();
      this.selectedEstate = null;
      this.estateToSave = null;
   }
   delete(estate: Estate): void {
      this.estateService.delete(estate);
      this.getEstates();
      this.selectedEstate = null;
   }
}