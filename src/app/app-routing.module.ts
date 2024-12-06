import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';
import { RecipesModule } from './recipes/recipes.module';
import {AuthGuard}from './auth/guards/auth.guard'
const routes: Routes = [
  //rutas hijas
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },

  {
    path:'recetas',
    loadChildren:() => import('./recipes/recipes.module').then(m=>m.RecipesModule),
    canLoad: [AuthGuard],
    canActivate:[AuthGuard]
  },

  {
    path: '404',
    component:Error404Component
  },
  {
    path: '**',
    redirectTo:'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
