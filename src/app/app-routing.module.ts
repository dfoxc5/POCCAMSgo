import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesComponent } from './estates.component';

const routes: Routes = [
   { path: '', redirectTo: 'estates', pathMatch: 'full' },
   { path: 'estates', component: EstatesComponent }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})
export class AppRoutingModule {}
