import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Receta } from '../../interfaces/recetas.interface';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent {
  public searchInput = new FormControl('');
  public recetas: Receta[]=[];
  public selectedReceta?: Receta;

  constructor(private recetasService: RecetasService){ }

  searchReceta(){
    const value: string =this.searchInput.value || '';

    this.recetasService.getSuggestions( value )
      .subscribe(recetas=>this.recetas=recetas);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void{
    if(!event.option.value){
      this.selectedReceta=undefined;
      return;
    }

    const receta: Receta = event.option.value;
    this.searchInput.setValue(receta.nombre);
    this.selectedReceta=receta;


  }

}
