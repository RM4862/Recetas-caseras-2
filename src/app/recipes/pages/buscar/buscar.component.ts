import { Component, OnInit } from '@angular/core';
import { Receta, Categoria } from '../../interfaces/recetas.interface';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent {
  // Lista de todas las recetas
  todasLasRecetas: Receta[] = [];

  // Recetas filtradas
  recetasFiltradas: Receta[] = [];

  // Término de búsqueda
  terminoBusqueda: string = '';

  // Categorías para filtrado
  categorias = Object.values(Categoria);
  categoriaSeleccionada: Categoria | null = null;

  constructor(private recetasService: RecetasService) {}

  ngOnInit() {
    // Cargar todas las recetas al iniciar
    this.recetasService.getRecetas().subscribe(
      (recetas: Receta[]) => {
        this.todasLasRecetas = recetas;
        this.recetasFiltradas = recetas;
      }
    );
  }

  // Método de búsqueda en tiempo real
  buscarRecetas() {
    // Filtrar recetas
    this.recetasFiltradas = this.todasLasRecetas.filter(receta => {
      // Filtro por nombre (insensible a mayúsculas/minúsculas)
      const coincideNombre = receta.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      // Filtro por categoría (si está seleccionada)
      const coincideCategoria = !this.categoriaSeleccionada ||
                                 receta.categoria === this.categoriaSeleccionada;

      return coincideNombre && coincideCategoria;
    });
  }

  // Método para filtrar por categoría
  filtrarPorCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.buscarRecetas();
  }

  // Limpiar filtros
  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.categoriaSeleccionada = null;
    this.recetasFiltradas = this.todasLasRecetas;
  }

  // Método para seleccionar una receta
  seleccionarReceta(receta: Receta) {
    // Aquí puedes agregar la lógica para manejar la selección de receta
    console.log('Receta seleccionada:', receta);
  }

}
