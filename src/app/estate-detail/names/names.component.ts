import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {EstateService} from '../../estate.service';
import {Estate} from '../../data-model/estate';
import {Name} from "../../data-model/name";

@Component({
  selector: 'app-estate-detail-names',
  templateUrl: './names.component.html',
})

export class NamesComponent implements OnInit {
  estate: Estate;
  estateID: string;
  selectedName: Name;

  constructor(private estateService: EstateService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  setupModal(name: Name){
    this.selectedName = name;
  }

  ngOnInit(): void {
    this.estateID = this.route.parent.snapshot.paramMap.get('id');
    this.estateService.getEstate(+this.estateID).then(estate => this.estate = estate);
  }
}
