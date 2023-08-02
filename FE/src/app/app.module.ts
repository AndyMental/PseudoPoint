import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuotesComponent } from './quotes/quotes.component';
import { QuotesFormComponent } from './quotes/forms/forms.component';
import { WineRatingsComponent } from './wine-ratings/wine-ratings.component';
import { WineratingsformComponent } from './wine-ratings/wineratingsform/wineratingsform.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { CelebritesformComponent } from './celebrities/celebritesform/celebritesform.component';
import { CricketersComponent } from './cricketers/cricketers.component';
import { CricketersformsComponent } from './cricketers/cricketersforms/cricketersforms.component';
import { ErrorTostComponent } from './error-tost/error-tost.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { PopupFormComponent } from './courses/popupform/popupform.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouteModule } from './route/route.module';
import { RouteRoutingModule } from './route/route-routing.module';
import { EventsComponent } from './events/events.component';
import { EventformComponent } from './events/eventform/eventform.component';
import { RecipeComponent } from './recipe/recipe.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RecipeformComponent } from './recipe/recipeform/recipeform.component';
import { VehicleformComponent } from './vehicles/vehicleform/vehicleform.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteconfirmationDialogComponent } from './deleteconfirmation-dialog/deleteconfirmation-dialog.component';
import { FlightComponent } from './flight/flight.component';
import { FlightFormComponent } from './flight/flight-form/flight-form.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherFormComponent } from './weather/weather-form/weather-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewFormComponent } from './reviews/review-form/review-form.component';
import { SpaceValidatorDirective } from './shared/directives/space-validator.directive';
import {NgxMatDatetimePickerModule,NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteConfirmationDailogComponent } from './delete-confirmation-dailog/delete-confirmation-dailog.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { SongsComponent } from './songs/songs.component';
import { SongFormComponent } from './song-form/song-form.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { EcommerceFormComponent } from './ecommerce-form/ecommerce-form.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RealEstateFormComponent } from './real-estate-form/real-estate-form.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UsersComponent } from './users/users.component';
import { UsersformComponent } from './users/usersform/usersform.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { NotificationformComponent } from './notifications/notificationform/notificationform.component';
import { ProductsformComponent } from './products/productsform/productsform.component';
import { MatDialog } from '@angular/material/dialog';
import { Oauth1Component } from './oauth1/oauth1.component';
import { Oauth1formComponent } from './oauth1/oauth1form/oauth1form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { CommonModule } from '@angular/common';

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
    CoursesComponent,
    PopupFormComponent,
    EventsComponent,
    EventformComponent,
    RecipeComponent,
    VehiclesComponent,
    RecipeformComponent,
    VehicleformComponent,
    DeleteconfirmationDialogComponent,
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
  ],
  imports: [BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouteModule,
        RouteRoutingModule,
        MatTableModule,MatDialogModule,
        MatIconModule,
        MatButtonModule,
        NgToastModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonToggleModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
