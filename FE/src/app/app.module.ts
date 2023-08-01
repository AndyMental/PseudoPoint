import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { MethodsComponent } from './methods/methods.component';
import { StocksComponent } from './stocks/stocks.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockFormComponent } from './stock-form/stock-form.component';
import { SongsComponent } from './songs/songs.component';
import { SongFormComponent } from './song-form/song-form.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { EcommerceFormComponent } from './ecommerce-form/ecommerce-form.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RealEstateFormComponent } from './real-estate-form/real-estate-form.component';
import { RouteRoutingModule } from './route/route-routing.module';
import { RouteModule } from './route/route.module';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatInputModule } from '@angular/material/input';

import { HealthComponent } from './health/health.component';
import { FormsComponent } from './health/forms/forms.component';
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





@NgModule({
  declarations: [
    AppComponent,
    // MethodsComponent,
    StocksComponent,
    StockFormComponent,
    SongsComponent,
    SongFormComponent,
    EcommerceComponent,
    EcommerceFormComponent,
    RealEstateComponent,
    RealEstateFormComponent,
    SuccessMessageComponent,
    ConfirmationModalComponent,
    SidebarComponent,
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
    SidebarComponent,
    WildlifeComponent,
    FormComponent,
    WeightConversionComponent,
    FormWeightComponent,
    GeographyComponent,
    HistoryEventsComponent,
    HeventFormComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouteModule,
    RouteRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouteModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    RouteModule,
    RouteRoutingModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
