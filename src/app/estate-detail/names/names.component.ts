import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {EstateService} from '../../estate.service';
import {Estate} from '../../data-model/estate';
import {Name} from "../../data-model/name";
import {Lookups} from "../../data-model/lookups";

@Component({
  selector: 'app-estate-detail-names',
  templateUrl: './names.component.html',
})

export class NamesComponent implements OnInit {
  estate: Estate;
  estateID: string;
  selectedName: Name;
  nameTypes: Lookups[];
  sffxs: Lookups[];

  constructor(private estateService: EstateService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  setupModal(name: Name) {
    this.selectedName = name;
  }

  ngOnInit(): void {
    this.estate = this.estateService.getSession();
    this.estateService.getLookups('NAMETYP').then(nameTypes => this.nameTypes = nameTypes);
    this.estateService.getLookups('SFFXTYP').then(sffxs => this.sffxs = sffxs);
  }

  getNameTypeDescription(appCode: string): string {
    if (this.nameTypes) {
      for (const code of this.nameTypes) {
        if (code.appCode === appCode) {
          return code.description;
        }
      }
    }
  }
  getSffxDescription(appCode: string): string {
    if (this.nameTypes) {
      for (const code of this.sffxs) {
        if (code.appCode === appCode) {
          return code.description;
        }
      }
    }
  }
}
