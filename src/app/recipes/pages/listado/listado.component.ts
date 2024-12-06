import { Component, OnInit} from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { Receta } from '../../interfaces/recetas.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit{
  recetas: Receta[]=[]; //inicializamos el arreglo de receta como vacío
  constructor(private recetasService:RecetasService){}

  ngOnInit(): void {
    this.recetasService.getRecetas().subscribe(recetas=>{
      this.recetas=recetas
    });
  }
}
