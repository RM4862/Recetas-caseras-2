import { Component } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { Categoria, Receta } from '../../interfaces/recetas.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  categorias=[
    {
      id: 'Ensalada'
    },
    {
      id: 'Sopa'
    },
    {
      id: 'Plato principal'
    },
    {
      id: 'Postre'
    },
    {
      id: 'Bebida'
    },
    {
      id: 'Aperitivo'
    },
  ];

  receta: Receta={
    id: '',
    nombre: '',
    categoria: Categoria.PlatoPrincipal,
    tiempoPreparacion: '',
    ingredientes: [],
    instrucciones: [],
    alt_img: '',
  }

  constructor(private recetasService: RecetasService){}

  ngOnInit():void{

  }

  guardar(){ //funcion para boton de guardar
    if(this.receta.nombre.trim().length===0){
      return;
    }

    this.recetasService.agregarReceta(this.receta)
      .subscribe( resp=>{
        console.log('Respuesta', resp);
      }

      )
  }

}
