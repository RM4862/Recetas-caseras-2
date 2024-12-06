import { Component } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { Categoria, Receta } from '../../interfaces/recetas.interface';
import { ActivatedRoute,Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  categorias = [
    { id: 'Ensalada' },
    { id: 'Sopa' },
    { id: 'Plato principal' },
    { id: 'Postre' },
    { id: 'Bebida' },
    { id: 'Aperitivo' },
  ];

  receta: Receta = {
    nombre: '',
    categoria: Categoria.PlatoPrincipal,
    tiempoPreparacion: '',
    ingredientes: [],
    instrucciones: [],
    alt_img: '',
  };

  nuevoIngrediente: string = ''; // Para añadir nuevos ingredientes
  nuevaInstruccion: string = ''; // Para añadir nuevas instrucciones

  constructor(private recetasService: RecetasService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit():void{

    if(!this.router.url.includes('editar')){
      return;
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.recetasService.getRecetaPorId(id))
    )
    .subscribe(receta=>this.receta = receta); //Devuelve la receta a editar
  }

  guardar() {
    if (this.receta.nombre.trim().length === 0) {
      return;
    }

    if(this.receta.id){
      //Actualizar receta
      this.recetasService.actualizarReceta(this.receta)
        .subscribe(receta=>console.log('Actualizando', receta))

    }else {
      //Crear receta
      this.recetasService.agregarReceta(this.receta).subscribe(receta => {
        this.router.navigate(['/recetas/editar',receta.id]);
      });
    }

  }

   //Eliminar receta
   borrarReceta(){
      this.recetasService.borrarReceta(this.receta.id!)
        .subscribe(resp=>{
          this.router.navigate(['/recetas']);
        });
   }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim().length > 0) {
      this.receta.ingredientes.push(this.nuevoIngrediente);
      this.nuevoIngrediente = ''; // Limpia el campo de entrada
    }
  }

  eliminarIngrediente(index: number) {
    this.receta.ingredientes.splice(index, 1);
  }

  agregarInstruccion() {
    if (this.nuevaInstruccion.trim().length > 0) {
      this.receta.instrucciones.push(this.nuevaInstruccion);
      this.nuevaInstruccion = ''; // Limpia el campo de entrada
    }
  }

  eliminarInstruccion(index: number) {
    this.receta.instrucciones.splice(index, 1);
  }

  regresar() {
    this.router.navigate(['/recetas/listado']);
  }


}
