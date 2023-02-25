import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Comuna } from '../ventas/models/comuna';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente()
  public comunas: Comuna[];
  public titulo:string = "Crear cliente"
  public errores: String[];
  constructor(private clienteService: ClienteService,
    private snack:MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute){}
  ngOnInit() { 
  this.activatedRoute.paramMap.subscribe(params => {
    let id = +params.get('id');
    if (id){
      this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
    }
  })

  }
  formSubmit(){
    console.log(this.cliente);
    if(this.cliente.nombre == '' || this.cliente.nombre == null){
     this.snack.open('El nombre de usuario es requerido !!', 'Aceptar',{
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
     });
      return;
    }
  }
  
  
  cargarCliente(): void{
  this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if(id){
      this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
    }
  })
  }
  create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      Swal.fire('Nuevo cliente', `Cliente ${json.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as String[];
      console.error('Codigo del error ' + err.status);
      console.error(err.error.errors);
    }
   
       );
    
  }
  
  
  update(): void{
    console.log(this.cliente);
    this.cliente.ventas = null;
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente actualizado', `Cliente actualizado con exito!`, 'success')
    },
  err => {
    this.errores = err.error.errors as String[];
    console.error('Codigo del error ' + err.status);
    console.error(err.error.errors);
  }
  
    )
  }
  }
  