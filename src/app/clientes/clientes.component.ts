import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import Swal from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
 
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
    ) {}
 
  ngOnInit() {
    let page = 0;
    this.activatedRoute.paramMap.subscribe ( params => {
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
    
      this.clienteService.getClientes(page)
     .pipe(
      tap(response => {
        console.log('ClientesComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
      }
    );

  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: `Estas seguro que quieres eliminar a ${cliente.nombre}?`,
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente eliminado!',
              `El cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            )
          }
        )
       
      }
    })
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
 
}
