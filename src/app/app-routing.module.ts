import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesComponent } from './estates.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { GetEstatesComponent } from './get-estates.component';
import { IdentifiersComponent } from './estate-detail/identifiers/identifiers.component';
import { NamesComponent } from './estate-detail/names/names.component';
import { CasenotesComponent } from './estate-detail/casenotes/casenotes.component';
import { VisitsComponent } from './estate-detail/visits/visits.component';

const routes: Routes = [
   { path: '', component: EstatesComponent },
   { path: 'estates', component: EstatesComponent },
   { path: 'detail/:id', component: EstateDetailComponent,
     children: [
        { path: '', component: NamesComponent },
        { path: 'names', component: NamesComponent },
        { path: 'ids', component: IdentifiersComponent },
        { path: 'casenotes', component: CasenotesComponent },
        { path: 'visits', component: VisitsComponent }
     ]},
   { path: 'getEstate', component: GetEstatesComponent }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ],
})
export class AppRoutingModule {}