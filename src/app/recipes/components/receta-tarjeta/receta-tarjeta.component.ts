import { Component, Input} from '@angular/core';
import {Receta} from '../../interfaces/recetas.interface'

@Component({
  selector: 'app-receta-tarjeta',
  templateUrl: './receta-tarjeta.component.html',
  styleUrls: ['./receta-tarjeta.component.scss']
})
export class RecetaTarjetaComponent {
  @Input() receta!: Receta; //siempre tendrá valores receta

}
