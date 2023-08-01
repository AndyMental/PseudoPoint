import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HealthComponent } from './health/health.component';
import { FormsComponent } from './health/forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { RouteRoutingModule } from './route/route-routing.module';
import { RouteModule } from './route/route.module';
import { ProjectsComponent } from './projects/projects.component';
import { BillingComponent } from './billing/billing.component';
import { GeoformComponent } from './geolocation/geoform/geoform.component';
import { ProjectformComponent } from './projects/projectform/projectform.component';
import { BillingformComponent } from './billing/billingform/billingform.component';
import { MainComponent } from './main/main.component';
import { ErrorToastComponent } from './error-toast/error-toast.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
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
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    GeoFormComponent,
    AppComponent,
    HealthComponent,
    FormsComponent,
    GeolocationComponent,
    ProjectsComponent,
    BillingComponent,
    GeoformComponent,
    ProjectformComponent,
    BillingformComponent,
    MainComponent,
    ErrorToastComponent,
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
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouteRoutingModule,
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
