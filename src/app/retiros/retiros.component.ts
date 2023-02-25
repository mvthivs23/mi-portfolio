import { Component, OnInit } from '@angular/core';
import { Retiro } from './retiro';
import { RetiroService } from './retiro.service';


@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html'
})
export class RetirosComponent implements OnInit {


  retiros: Retiro[];

  constructor(private retiroService: RetiroService){ }

  ngOnInit() {
      this.retiroService.getRetiros().subscribe(
      
      (retiros) => 
        this.retiros = retiros
        );
      }
    }
    