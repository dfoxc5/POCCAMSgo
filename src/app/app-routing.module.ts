import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesComponent } from './estates.component';
import { EstateDetailComponent } from './estate-detail.component';
import { GetEstatesComponent } from './get-estates.component';

const routes: Routes = [
   { path: '', component: EstatesComponent },
   { path: 'estates', component: EstatesComponent },
   { path: 'detail/:id', component: EstateDetailComponent },
   { path: 'getEstate', component: GetEstatesComponent }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ],
})
export class AppRoutingModule {}