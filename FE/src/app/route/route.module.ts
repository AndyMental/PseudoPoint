import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import { RouteRoutingModule } from './route-routing.module';

import { NotificationsComponent } from '../notifications/notifications.component';
import { UsersComponent } from '../users/users.component';
import { ProductsComponent } from '../products/products.component';
import { from } from 'rxjs';
import { Oauth1Component } from '../oauth1/oauth1.component';
const routes : Routes = [
    
    {path:'notifications',component:NotificationsComponent},
    {path:'users',component:UsersComponent},
    {path:'products',component:ProductsComponent},
    {path:'oauth1', component:Oauth1Component}
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
