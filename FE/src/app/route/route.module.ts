import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { WildlifeComponent } from '../wildlife/wildlife.component';
import { WeightConversionComponent } from '../weight-conversion/weight-conversion.component';
import { GeographyComponent } from '../geography/geography.component';
import { HistoryEventsComponent } from '../history-events/history-events.component';


const routes: Routes = [
  {path:'wild', component: WildlifeComponent },
  {path:'weight', component: WeightConversionComponent},
  {path:'geography',component:GeographyComponent },
  {path:'event',component:HistoryEventsComponent},
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