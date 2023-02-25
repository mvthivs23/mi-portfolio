import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { Producto } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlEndPoint: string = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) { }

  getVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.urlEndPoint, venta)
  }
  }

  

