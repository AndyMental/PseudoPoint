import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; // CLI imports routerine your routes
import { HealthComponent } from '../health/health.component';
import { GeolocationComponent } from '../geolocation/geolocation.component';
import { RouteRoutingModule } from './route-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import { BillingComponent } from '../billing/billing.component';
import { MainComponent } from '../main/main.component';
const routes: Routes = [
  {path:'',component: MainComponent},
  { path: 'health', component: HealthComponent },
  { path: 'geolocation', component: GeolocationComponent },
  { path: 'project', component: ProjectsComponent },
  {path:'billing',component:BillingComponent}
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouteRoutingModule, RouterModule.forRoot(routes)],
})
export class RouteModule {}
