import { Routes } from '@angular/router';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component:VehicleSearchComponent}
];
