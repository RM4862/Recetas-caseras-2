import { Component, Input } from '@angular/core';
import { Receta } from '../../interfaces/recetas.interface';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-receta-tarjeta',
  templateUrl: './receta-tarjeta.component.html',
  styleUrls: ['./receta-tarjeta.component.scss']
})
export class RecetaTarjetaComponent {
  @Input() receta!: Receta;

  constructor(private recetasService: RecetasService) {}

  get isFavorite(): boolean {
    return this.receta.id
      ? this.recetasService.esRecetaFavorita(this.receta.id)
      : false;
  }

  toggleFavorite() {
    if (this.receta.id) {
      this.recetasService.toggleFavorito(this.receta);
    }
  }
}
