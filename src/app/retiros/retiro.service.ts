import { Injectable } from '@angular/core';
import { RETIROS } from './retiros.json';
import { Retiro } from './retiro';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class RetiroService {

  constructor() { }

  getRetiros(): Observable<Retiro[]>{
    return of (RETIROS);
  }
}
