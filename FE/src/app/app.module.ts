import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { SpaceValidatorDirective } from './shared/directives/space-validator.directive';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteConfirmationDailogComponent } from './delete-confirmation-dailog/delete-confirmation-dailog.component';
import { UsersComponent } from './users/users.component';
import { UsersformComponent } from './users/usersform/usersform.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { NotificationformComponent } from './notifications/notificationform/notificationform.component';
import { ProductsformComponent } from './products/productsform/productsform.component';
import { Oauth1Component } from './oauth1/oauth1.component';
import { Oauth1formComponent } from './oauth1/oauth1form/oauth1form.component';
import { HealthComponent } from './health/health.component';
import { FormsComponent } from './health/forms/forms.component';
import { FormsModule } from '@angular/forms';
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
    ReviewFormComponent,
    SpaceValidatorDirective,
    SidebarComponent,
    DeleteConfirmationDailogComponent,
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
    SidebarComponent,
    WildlifeComponent,
    FormComponent,
    WeightConversionComponent,
    FormWeightComponent,
    GeographyComponent,
    HistoryEventsComponent,
    HeventFormComponent,
    DeleteDialogComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouteModule,
    RouteRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
