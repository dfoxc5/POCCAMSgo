import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EstateService } from '../../estate.service';
import { Estate } from '../../data-model/estate';
import { Identifier } from '../../data-model/identifiers';
import { Lookups } from '../../data-model/lookups';

@Component({
   selector: 'app-estate-detail-visits',
   templateUrl: './visits.component.html',
})

export class VisitsComponent implements OnInit {
   ngOnInit() {

   }
}
