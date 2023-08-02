import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from '../courses/courses.component';
import { EventsComponent } from '../events/events.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from '../flight/flight.component';
import { ArticlesComponent } from '../articles/articles.component';
import { WeatherComponent } from '../weather/weather.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { SongsComponent } from '../songs/songs.component';
import { RealEstateComponent } from '../real-estate/real-estate.component';
import { StocksComponent } from '../stocks/stocks.component';
import { EcommerceComponent } from '../ecommerce/ecommerce.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UsersComponent } from '../users/users.component';
import { ProductsComponent } from '../products/products.component';
import { Oauth1Component } from '../oauth1/oauth1.component';
import { HealthComponent } from '../health/health.component';
import { GeolocationComponent } from '../geolocation/geolocation.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BillingComponent } from '../billing/billing.component';
import { MainComponent } from '../main/main.component';
import { WildlifeComponent } from '../wildlife/wildlife.component';
import { WeightConversionComponent } from '../weight-conversion/weight-conversion.component';
import { GeographyComponent } from '../geography/geography.component';
import { HistoryEventsComponent } from '../history-events/history-events.component';
const routes: Routes = [
  {path:'courses', component: CoursesComponent },
  {path:'recipes', component: RecipeComponent },
  {path:'events',component:EventsComponent},
  {path:'vehicles',component:VehiclesComponent},
  {path:'notifications',component:NotificationsComponent},
  {path:'users',component:UsersComponent},
  {path:'products',component:ProductsComponent},
  {path:'oauth1', component:Oauth1Component},
   { path: '', component: MainComponent },
    { path: 'health', component: HealthComponent },
    { path: 'geolocation', component: GeolocationComponent },
    { path: 'project', component: ProjectsComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'wild', component: WildlifeComponent },
    { path: 'weight', component: WeightConversionComponent },
    { path: 'geography', component: GeographyComponent },
    { path: 'event', component: HistoryEventsComponent },
    { path: 'flights', component: FlightComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'real-estate', component: RealEstateComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'ecommerce', component: EcommerceComponent },
  
]


@NgModule({
  declarations: [],
  imports: [CommonModule, RouteRoutingModule, RouterModule.forRoot(routes)],
})
export class RouteModule {}
