import { Component } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { Categoria, Receta } from '../../interfaces/recetas.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  categorias = [
    { id: 'Ensalada' },
    { id: 'Sopa' },
    { id: 'Plato principal' },
    { id: 'Postre' },
    { id: 'Bebida' },
    { id: 'Aperitivo' },
  ];

  receta: Receta = {
    id: '',
    nombre: '',
    categoria: Categoria.PlatoPrincipal,
    tiempoPreparacion: '',
    ingredientes: [],
    instrucciones: [],
    alt_img: '',
  };

  nuevoIngrediente: string = ''; // Para añadir nuevos ingredientes
  nuevaInstruccion: string = ''; // Para añadir nuevas instrucciones

  constructor(private recetasService: RecetasService) {}

  guardar() {
    if (this.receta.nombre.trim().length === 0) {
      return;
    }

    this.recetasService.agregarReceta(this.receta).subscribe(resp => {
      console.log('Respuesta', resp);
    });
  }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim().length > 0) {
      this.receta.ingredientes.push(this.nuevoIngrediente);
      this.nuevoIngrediente = ''; // Limpia el campo de entrada
    }
  }

  eliminarIngrediente(index: number) {
    this.receta.ingredientes.splice(index, 1);
  }

  agregarInstruccion() {
    if (this.nuevaInstruccion.trim().length > 0) {
      this.receta.instrucciones.push(this.nuevaInstruccion);
      this.nuevaInstruccion = ''; // Limpia el campo de entrada
    }
  }

  eliminarInstruccion(index: number) {
    this.receta.instrucciones.splice(index, 1);
  }
}
