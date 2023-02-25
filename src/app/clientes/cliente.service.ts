import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2'
import { Router } from '@angular/router'
import { Comuna } from '../ventas/models/comuna';
 
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private http : HttpClient, private router: Router) { }
 
  
  getClientes(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        }
        )
      }),
      map((response: any) => {
       (response.content as Cliente[]).map(cliente =>{
        cliente.nombre = cliente.nombre.toUpperCase();
        return cliente;
       });
       return response;
      }
      ),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        }
        )
      })
    );
  }

    create(cliente: Cliente) : Observable<any>{
      return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status==400){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }
   
    getCliente(id): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
return throwError(e);
        })
      )
    }

    getById(id: number): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
    }

    update(cliente: Cliente): Observable<Cliente>{
      return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status==400){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      )
    }
    
    delete(id: number): Observable<void>{
      return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
    }

    subirFoto(archivo: File, id): Observable<Cliente>{
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);

      return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
map( (response: any) => response.cliente as Cliente),
catchError(e => {
console.error(e.error.mensaje);
swal.fire(e.error.mensaje, e.error.error, 'error');
return throwError(e);
})
      );

    }
   
    }

   
      
  
