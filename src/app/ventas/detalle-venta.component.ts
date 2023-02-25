import { Component, OnInit } from '@angular/core';
import { Venta } from './models/venta';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from './services/venta.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html'
})
export class DetalleVentaComponent implements OnInit {

  venta: Venta;
  titulo: string = 'Venta';

constructor(private ventaService: VentaService,
  private activatedRoute: ActivatedRoute){}

  ngOnInit(){
this.activatedRoute.paramMap.subscribe(params => {
  let id = +params.get('id');
  this.ventaService.getVenta(id).subscribe(venta => this.venta = venta);
});
  }
}
