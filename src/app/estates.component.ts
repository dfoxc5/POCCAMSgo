import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-estates',
   templateUrl: './estates.component.html',
   styleUrls: [ './estates.component.css' ],
})

export class EstatesComponent implements OnInit {
   ngOnInit(): void {}

   addEstate(id: string, firstName: string, lastName: string): void {
   }
}
