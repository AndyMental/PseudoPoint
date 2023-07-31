import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { WineRatingsComponent } from '../wine-ratings/wine-ratings.component';
import { QuotesComponent } from '../quotes/quotes.component';
import { CelebritiesComponent } from '../celebrities/celebrities.component';
import { CricketersComponent } from '../cricketers/cricketers.component';


const routes: Routes = [
  {path:'quotes', component: QuotesComponent },
  {path:'wine-rating', component: WineRatingsComponent},
  {path:'celebrities', component: CelebritiesComponent},
  {path:'cricketers', component: CricketersComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouteRoutingModule,
    RouterModule.forRoot(routes)
  ]
})
export class RouteModule { }