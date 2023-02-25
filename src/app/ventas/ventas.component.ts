import { Component, OnInit } from '@angular/core';
import { Venta } from './models/venta';
import { ClienteService } from '../clientes/cliente.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import { VentaService } from './services/venta.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemVenta } from './models/item-venta';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  titulo: string = 'Nueva venta';
  venta: Venta = new Venta();
  autoCompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
    private ventaService: VentaService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        let clienteId = +params.get('clienteId');
        this.clienteService.getCliente(clienteId).subscribe(cliente => this.venta.cliente = cliente);
      });

      this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        mergeMap(value => value ? this._filter(value): [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.ventaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined{
return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
let producto = event.option.value as Producto;
console.log(producto);

if(this.existeItem(producto.id)){
  this.incrementaCantidad(producto.id);
} else {
let nuevoItem = new ItemVenta();
nuevoItem.producto = producto;
this.venta.items.push(nuevoItem);
}
this.autoCompleteControl.setValue('');
event.option.focus();
event.option.deselect();
  }

  actualizarCantidad(id:number, event:any): void{
let cantidad:number = event.target.value as number;

if(cantidad==0){
  return this.eliminarItemVenta(id);
}
this.venta.items = this.venta.items.map((item:ItemVenta) => {
  if(id === item.producto.id){
    item.cantidad = cantidad;
  }
  return item;
});
  }

  existeItem(id:number): boolean {
let existe = false;
this.venta.items.forEach((item: ItemVenta) => {
  if(id === item.producto.id){
    existe = true;
  }
});
return existe;
  }

  incrementaCantidad(id:number): void {
this.venta.items = this.venta.items.map((item: ItemVenta) => { 
  if(id === item.producto.id){
    ++item.cantidad;
  }
  return item;
});
  }

  eliminarItemVenta(id:number): void{
    this.venta.items = this.venta.items.filter((item: ItemVenta) => id !== item.producto.id);
  }

  create(): void{
    console.log(this.venta);
    this.ventaService.create(this.venta).subscribe(venta => {
Swal.fire(this.titulo, `Venta ${venta.descripcion} creada con exito!`, 'success');
this.router.navigate(['/clientes']);
    })
  }
}
  


