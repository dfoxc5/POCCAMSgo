import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesComponent } from './estates.component';
import { EstateDetailComponent } from './estate-detail.component';
import { GetEstatesComponent } from './get-estates.component';

const routes: Routes = [
   { path: '', redirectTo: '/estates', pathMatch: 'full' },
   { path: 'estates', component: EstatesComponent },
   { path: 'detail/:id', component: EstateDetailComponent },
   { path: 'getEstates', component: GetEstatesComponent }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ],
})
export class AppRoutingModule {}