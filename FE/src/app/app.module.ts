import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
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
import { CommonModule } from '@angular/common'
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DeleteconfirmationDialogComponent } from './deleteconfirmation-dialog/deleteconfirmation-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
    CoursesComponent,
    PopupFormComponent,
    EventsComponent,
    EventformComponent,
    RecipeComponent,
    VehiclesComponent,
    RecipeformComponent,
    VehicleformComponent,
    SidebarComponent,
    DeleteconfirmationDialogComponent
    
    
  ],
  imports: [
    BrowserModule,CommonModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
  
})
export class AppModule { }
