import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { PaginatorComponent } from './paginator/paginator.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';


const routes: Routes = [
{path: '', redirectTo: '/inicio', pathMatch: 'full'},
{path: 'inicio', component: InicioComponent},
{path: 'sobre-mi', component: SobreMiComponent}






];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    IndicadoresComponent,
    PaginatorComponent,
    SobreMiComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FontAwesomeModule


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
