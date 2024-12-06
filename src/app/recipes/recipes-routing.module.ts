import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    children:[
      {path:'listado',component:ListadoComponent},
      {path: 'agregar',component:AgregarComponent},
      {path:'editar/:id',component:AgregarComponent}, //ruta para editar la ruta escogida
      {path:'buscar',component:BuscarComponent},
      {path:'favoritos',component:FavoritosComponent},
      {path:':id',component:RecetaComponent},//ruta para leer más
      {path:'**',redirectTo:'listado'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
