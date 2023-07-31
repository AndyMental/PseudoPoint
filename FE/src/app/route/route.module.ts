import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from '../flight/flight.component';
import { ArticlesComponent } from '../articles/articles.component';
import { WeatherComponent } from '../weather/weather.component';
import { ReviewsComponent } from '../reviews/reviews.component';

const routes: Routes = [
  { path: 'flights', component: FlightComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'reviews', component: ReviewsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouteRoutingModule, RouterModule.forRoot(routes)],
})
export class RouteModule {}
