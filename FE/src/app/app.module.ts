import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouteModule } from './route/route.module';
import { RouteRoutingModule } from './route/route-routing.module';
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
import { WildlifeComponent } from './wildlife/wildlife.component';
import { FormComponent } from './wildlife/form/form.component';
import { WeightConversionComponent } from './weight-conversion/weight-conversion.component';
import { MatTableModule } from '@angular/material/table';

import { FormWeightComponent } from './weight-conversion/form-weight/form-weight.component';
import { GeographyComponent } from './geography/geography.component';
import { GeoFormComponent } from './geography/geo-form/geo-form.component';
import { HistoryEventsComponent } from './history-events/history-events.component';
import { HeventFormComponent } from './history-events/hevent-form/hevent-form.component';
import { PopupformComponent } from './popupform/popupform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
    WildlifeComponent,
    FormComponent,
    WeightConversionComponent,
  
    FormWeightComponent,
    GeographyComponent,
    GeoFormComponent,
    HistoryEventsComponent,
    HeventFormComponent,
    PopupformComponent,
    SidebarComponent,
    ConfirmationComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Add FormsModul
    RouteModule,
    RouteRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule ,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
