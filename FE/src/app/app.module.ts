import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';

import { QuotesComponent } from './quotes/quotes.component';
import { FormsComponent } from './health/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { QuotesFormComponent } from './quotes/forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WineRatingsComponent } from './wine-ratings/wine-ratings.component';
import { RouteModule } from './route/route.module';
import { RouteRoutingModule } from './route/route-routing.module';
import { WineratingsformComponent } from './wine-ratings/wineratingsform/wineratingsform.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { CelebritesformComponent } from './celebrities/celebritesform/celebritesform.component';
import { CricketersComponent } from './cricketers/cricketers.component';
import { CricketersformsComponent } from './cricketers/cricketersforms/cricketersforms.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ErrorTostComponent } from './error-tost/error-tost.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { OauthComponent } from './oauth/oauth.component';
// import { PopupformComponent } from './oauth/popupform/popupform.component';
import { UsersComponent } from './users/users.component';
import { UsersformComponent } from './users/usersform/usersform.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { NotificationformComponent } from './notifications/notificationform/notificationform.component';
// import { ProductsformComponent } from './productsform/productsform.component';
import { ProductsformComponent } from './products/productsform/productsform.component';
import { MatDialog } from '@angular/material/dialog';

import { Oauth1Component } from './oauth1/oauth1.component';
import { Oauth1formComponent } from './oauth1/oauth1form/oauth1form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HealthComponent } from './health/health.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { ProjectsComponent } from './projects/projects.component';
import { BillingComponent } from './billing/billing.component';
import { GeoformComponent } from './geolocation/geoform/geoform.component';
import { ProjectformComponent } from './projects/projectform/projectform.component';
import { BillingformComponent } from './billing/billingform/billingform.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { WildlifeComponent } from './wildlife/wildlife.component';
import { FormComponent } from './wildlife/form/form.component';
import { WeightConversionComponent } from './weight-conversion/weight-conversion.component';
import { FormWeightComponent } from './weight-conversion/form-weight/form-weight.component';
import { GeographyComponent } from './geography/geography.component';
import { GeoFormComponent } from './geography/geo-form/geo-form.component';
import { HistoryEventsComponent } from './history-events/history-events.component';
import { HeventFormComponent } from './history-events/hevent-form/hevent-form.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatLabel } from '@angular/material/form-field';






@NgModule({
  declarations: [

    // MethodsComponent,
    QuotesComponent,
    QuotesFormComponent,
    WineRatingsComponent,
    WineratingsformComponent,
    CelebritiesComponent,
    CelebritesformComponent,
    CricketersComponent,
    CricketersformsComponent,
    SuccessMessageComponent,
    ErrorTostComponent,
    SidebarComponent,
    DeleteConfirmComponent,
    AppComponent,
    UsersComponent,
    UsersformComponent,
    NotificationsComponent,
    ProductsComponent,
    NotificationformComponent,
    ProductsformComponent,
    Oauth1Component,
    Oauth1formComponent,
    HealthComponent,
    FormsComponent,
    GeolocationComponent,
    ProjectsComponent,
    BillingComponent,
    GeoformComponent,
    ProjectformComponent,
    BillingformComponent,
    MainComponent,
    GeoFormComponent,

    WildlifeComponent,
    FormComponent,
    WeightConversionComponent,
    FormWeightComponent,
    GeographyComponent,
    HistoryEventsComponent,
    HeventFormComponent,
    DeleteDialogComponent,
  ]
    
    
    




,
  imports: [BrowserModule,
     HttpClientModule,
      RouteModule, FormsModule,
       MatDialogModule, RouteRoutingModule, 
       ReactiveFormsModule, MatTableModule, MatButtonModule, 
       MatCardModule, MatIconModule, MatButtonToggleModule,
        MatSnackBarModule, BrowserAnimationsModule,MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
