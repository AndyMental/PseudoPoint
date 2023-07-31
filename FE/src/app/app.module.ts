import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
import { QuotesComponent } from './quotes/quotes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsComponent } from './quotes/forms/forms.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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






@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
    QuotesComponent,
    FormsComponent,
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

    
    
    
  ],
  imports: [BrowserModule,HttpClientModule,RouteModule,FormsModule,MatDialogModule,RouteRoutingModule,ReactiveFormsModule,MatTableModule,MatButtonModule,MatDialogModule,MatCardModule,MatIconModule,MatButtonToggleModule,MatSnackBarModule,BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


