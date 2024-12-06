import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../interfaces/recetas.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(receta: Receta): string {
    if(!receta.id && !receta.alt_img ){
      return 'assets/no-image.png'; //si esta vacio el campo poner imagen por defecto
    }else if(receta.alt_img){
      return receta.alt_img; //La URL de la imagen en internet
    }else{
      return `../../../assets/receta/${receta.id}.jpg`;
    }

  }

}
