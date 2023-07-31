import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
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
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteConfirmationDailogComponent } from './delete-confirmation-dailog/delete-confirmation-dailog.component';

@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
