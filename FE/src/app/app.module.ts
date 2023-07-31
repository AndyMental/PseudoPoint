import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
// import { OauthComponent } from './oauth/oauth.component';
// import { PopupformComponent } from './oauth/popupform/popupform.component';
import { RouteModule } from './route/route.module';
import { RouteRoutingModule } from './route/route-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersformComponent } from './users/usersform/usersform.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { NotificationformComponent } from './notifications/notificationform/notificationform.component';
// import { ProductsformComponent } from './productsform/productsform.component';
import { ProductsformComponent } from './products/productsform/productsform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';

import { SidebarComponent } from './sidebar/sidebar.component';
import { Oauth1Component } from './oauth1/oauth1.component';
import { Oauth1formComponent } from './oauth1/oauth1form/oauth1form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
    
    
    // OauthComponent,
    // PopupformComponent,
    UsersComponent,
    UsersformComponent,
    NotificationsComponent,
    ProductsComponent,
    NotificationformComponent,
    ProductsformComponent,
    
    SidebarComponent,
    Oauth1Component,
    Oauth1formComponent,
    
  ],
  imports: [
    BrowserModule,MatDialogModule,
    BrowserModule, FormsModule, ReactiveFormsModule,ReactiveFormsModule,
    HttpClientModule,RouteModule,RouteRoutingModule, BrowserAnimationsModule,MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule,MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
