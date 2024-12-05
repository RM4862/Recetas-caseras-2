//Middleware-controlador
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../interfaces/recetas.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>(`${this.baseUrl}/recetas`);//conectamos la interfaz que devuelve una coleccion de recetas para obtener un observable
  }

  getRecetaPorId(id: string): Observable <Receta>{
    return this.http.get<Receta>(`${this.baseUrl}/recetas/${id}`);
  }

  getSuggestions( query: string ): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${ this.baseUrl }/recetas?q=${ query }`);
  }

  agregarReceta(receta:Receta): Observable<Receta>{
    return this.http.post<Receta>(`${ this.baseUrl }/recetas`,receta)
  }

}

