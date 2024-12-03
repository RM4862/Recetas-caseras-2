import { Component,OnInit } from '@angular/core';
import {ActivatedRoute}from '@angular/router';
import { RecetasService } from '../../services/recetas.service';
import { Receta } from '../../interfaces/recetas.interface';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.
    subscribe(console.log)
    //mostrar solo id en consola
  }
}
