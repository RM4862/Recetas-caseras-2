//Middleware controlador
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Receta } from '../interfaces/recetas.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private baseUrl: string = environment.baseUrl;
  private favoritosSubject = new BehaviorSubject<Receta[]>([]);
  favoritos$ = this.favoritosSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load favorites from local storage on service initialization
    const storedFavorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.favoritosSubject.next(storedFavorites);
  }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.baseUrl}/recetas`);
  }

  getRecetaPorId(id: string): Observable <Receta>{
    return this.http.get<Receta>(`${this.baseUrl}/recetas/${id}`);
  }

  getSuggestions( query: string ): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${ this.baseUrl }/recetas?q=${ query }`);
  }


  // Método para agregar/quitar favoritos
  toggleFavorito(receta: Receta) {
    const favoritosActuales = this.favoritosSubject.value;
    const esFavorito = favoritosActuales.some(f => f.id === receta.id);

    let nuevosFavoritos: Receta[];
    if (esFavorito) {
      // Quitar de favoritos
      nuevosFavoritos = favoritosActuales.filter(f => f.id !== receta.id);
    } else {
      // Agregar a favoritos
      nuevosFavoritos = [...favoritosActuales, receta];
    }

    // Actualizar valor en BehaviorSubject
    this.favoritosSubject.next(nuevosFavoritos);

    // Guardar en localStorage
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    return !esFavorito;
  }

  // Método para obtener favoritos
  obtenerFavoritos(): Receta[] {
    return this.favoritosSubject.value;
  }

  // Método para verificar si una receta es favorita
  esRecetaFavorita(recetaId: string): boolean {
    return this.favoritosSubject.value.some(f => f.id === recetaId);
  }

  // reiniciar los favoritos
  resetFavoritos() {
      this.favoritosSubject.next([]);
      localStorage.removeItem('favoritos');
  }

  //Operaciones CRUD
  agregarReceta(receta:Receta): Observable<Receta>{
    return this.http.post<Receta>(`${ this.baseUrl }/recetas`,receta)
  }

  actualizarReceta(receta:Receta): Observable<Receta>{
    return this.http.put<Receta>(`${ this.baseUrl }/recetas/${receta.id}`,receta)
  }

  borrarReceta(id:string): Observable<any>{ //devuelve un tipo any ya que no regresa nada
    return this.http.delete<any>(`${ this.baseUrl }/recetas/${id}`)
  }

}
