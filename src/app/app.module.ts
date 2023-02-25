import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { RetirosComponent } from './retiros/retiros.component';
import { RetiroService } from './retiros/retiro.service';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { DetalleVentaComponent } from './ventas/detalle-venta.component';
import { VentasComponent } from './ventas/ventas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


const routes: Routes = [
{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: 'inicio', component: InicioComponent},
{path: 'clientes', component: ClientesComponent},
{path: 'clientes/page/:page', component: ClientesComponent},
{path: 'retiros', component: RetirosComponent},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'clientes/form', component: FormComponent},
{path: 'clientes/form/:id', component: FormComponent},
{path: 'ventas/:id', component: DetalleVentaComponent},
{path: 'ventas/form/:clienteId', component: VentasComponent}



];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    InicioComponent,
    RetirosComponent,
    IndicadoresComponent,
    LoginComponent,
    SignupComponent,
    FormComponent,
    DetalleComponent,
    PaginatorComponent,
    DetalleVentaComponent,
    VentasComponent,

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
    MatAutocompleteModule


  ],
  providers: [ClienteService,
  RetiroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
