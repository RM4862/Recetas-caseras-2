import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../interfaces/recetas.interface';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private http: HttpClient) {
  }

  getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>('http://localhost:3000/recetas') //conectamos la interfaz que devuelve una coleccion de recetas para obtener un observable
  }
}
