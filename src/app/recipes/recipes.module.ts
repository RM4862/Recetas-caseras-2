import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesRoutingModule } from './recipes-routing.module';
import { MaterialModule } from '../material/material.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { RecetaTarjetaComponent } from './components/receta-tarjeta/receta-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';




@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    RecetaComponent,
    ListadoComponent,
    HomeComponent,
    RecetaTarjetaComponent,
    ImagenPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule { }
