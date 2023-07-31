import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
// import { WineRatingsComponent } from '../wine-ratings/wine-ratings.component';
//import { CoursesComponent } from '../quotes/quotes.component';
import { CoursesComponent } from '../courses/courses.component';
import { EventsComponent } from '../events/events.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';
const routes: Routes = [
  {path:'courses', component: CoursesComponent },
  {path:'recipes', component: RecipeComponent },
  {path:'events',component:EventsComponent},
  {path:'vehicles',component:VehiclesComponent}
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