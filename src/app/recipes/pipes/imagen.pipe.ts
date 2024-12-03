import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../interfaces/recetas.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(receta: Receta): string {
    return `../../../assets/receta/${receta.id}.jpg`; // Cambiadas las comillas simples por backticks
  }

}
