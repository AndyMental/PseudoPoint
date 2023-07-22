import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { RouteModule } from './route/route.module';
import { RouteRoutingModule } from './route/route-routing.module';
import { FlightFormComponent } from './flight/flight-form/flight-form.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherFormComponent } from './weather/weather-form/weather-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    FlightFormComponent,
    ArticlesComponent,
    ArticleFormComponent,
    WeatherComponent,
    WeatherFormComponent,
    ReviewsComponent,
    ReviewFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    RouteModule,
    RouteRoutingModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
