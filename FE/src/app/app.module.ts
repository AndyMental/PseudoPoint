import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MethodsComponent } from './methods/methods.component';
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





@NgModule({
  declarations: [
    AppComponent,
    MethodsComponent,
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
    SidebarComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
