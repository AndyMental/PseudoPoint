import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from '../notifications/notifications.component';
import { UsersComponent } from '../users/users.component';
import { ProductsComponent } from '../products/products.component';
import { Oauth1Component } from '../oauth1/oauth1.component';
import { HealthComponent } from '../health/health.component';
import { GeolocationComponent } from '../geolocation/geolocation.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BillingComponent } from '../billing/billing.component';
import { MainComponent } from '../main/main.component';
import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { WildlifeComponent } from '../wildlife/wildlife.component';
import { WeightConversionComponent } from '../weight-conversion/weight-conversion.component';
import { GeographyComponent } from '../geography/geography.component';
import { HistoryEventsComponent } from '../history-events/history-events.component';
const routes : Routes = [
    
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


