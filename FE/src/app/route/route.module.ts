import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoutingModule } from './route-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from '../songs/songs.component';
import { RealEstateComponent } from '../real-estate/real-estate.component';
import { StocksComponent } from '../stocks/stocks.component';
import { EcommerceComponent } from '../ecommerce/ecommerce.component';



const routes: Routes = [
  {path:'songs', component: SongsComponent },
  {path:'real-estate', component: RealEstateComponent},
  {path:'stocks', component:StocksComponent},
  {path:'ecommerce',component:EcommerceComponent},
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