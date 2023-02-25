import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { __importDefault } from 'tslib';
import { Venta } from 'src/app/ventas/models/venta';
import { VentaService } from 'src/app/ventas/services/venta.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
@Input() cliente: Cliente;
public titulo:string = "Detalle cliente";
public fotoSeleccionada: File;

constructor(private clienteService: ClienteService,
  private ventaService: VentaService,
  public modalService: ModalService){ }

  ngOnInit() {

  }

  seleccionarFoto(event){
this.fotoSeleccionada = event.target.files[0];
console.log(this.fotoSeleccionada);
if(this.fotoSeleccionada.type.indexOf('image') < 0){
  swal.fire('Error seleccionar imagen', 'el archivo debe ser del tipo imagen', 'error');
  this.fotoSeleccionada = null;
}
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error: ', 'Debe seleccionar una foto ', 'error');
    }else{
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(cliente => {
    this.cliente = cliente;
    swal.fire('La foto se ha subido correctamente!', `La foto se ha subido con exito: ${this.cliente.foto}`, 'success');
    });
  }
}

cerrarModal(){
  this.modalService.cerrarModal();
  this.fotoSeleccionada = null;
}

delete(venta:Venta): void {
  Swal.fire({
    title: `Estas seguro que quieres eliminar la venta ${venta.descripcion}?`,
    text: "No podras revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.ventaService.delete(venta.id).subscribe(
        response =>{
          this.cliente.ventas = this.cliente.ventas.filter(v => v !== venta)
          Swal.fire(
            'Venta eliminada!',
            `Venta ${venta.descripcion} eliminado con exito.`,
            'success'
          )
        }
      )
     
    }
  })
}
}


