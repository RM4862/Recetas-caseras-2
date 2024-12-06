import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecetasService } from '../../services/recetas.service';
import { Categoria, Receta } from '../../interfaces/recetas.interface';
import { ActivatedRoute,Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
              private router: Router,
              private snackBar:MatSnackBar,
              public dialog: MatDialog
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
        .subscribe(receta=>this.mostrarSnackbar('Registro actualizado'))

    }else {
      //Agregar receta
      this.recetasService.agregarReceta(this.receta).subscribe(receta => {
        this.router.navigate(['/recetas/editar',receta.id]);
        this.mostrarSnackbar('Registro creado');
      });
    }

  }

   //Eliminar receta
   borrarReceta(){ //padre de mat-dialog
    //Convertimos en variable nuestro dialogo de confirmación
    const dialog= this.dialog.open(ConfirmarComponent,{
      width: '550px',
      height: '190px',
      data: {...this.receta} //para no modificar el componente lo insertamos para solo lectura
    });

    dialog.afterClosed().subscribe( //registramos la opción de nuestro dialogo
      (result)=>{
        if (result){ //si nos devuelve true al presionar el boton eliminar entonces..
          this.recetasService.borrarReceta(this.receta.id!)
        .subscribe(resp=>{
          this.router.navigate(['/recetas']);
          this.mostrarSnackbar('Registro eliminado');
        });
        }
      }
    )
   }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim().length > 0) {
      this.receta.ingredientes.push(this.nuevoIngrediente);
      this.nuevoIngrediente = ''; // Limpia el campo de entrada
      this.mostrarSnackbar('Ingrediente agregado');
    }
  }

  eliminarIngrediente(index: number) {
    this.receta.ingredientes.splice(index, 1);
    this.mostrarSnackbar('Ingrediente eliminado');
  }

  agregarInstruccion() {
    if (this.nuevaInstruccion.trim().length > 0) {
      this.receta.instrucciones.push(this.nuevaInstruccion);
      this.nuevaInstruccion = ''; // Limpia el campo de entrada
      this.mostrarSnackbar('Instruccion agregada');
    }
  }

  eliminarInstruccion(index: number) {
    this.receta.instrucciones.splice(index, 1);
    this.mostrarSnackbar('Instruccion eliminada');
  }

  regresar() {
    this.router.navigate(['/recetas/listado']);
  }

  mostrarSnackbar(mensaje:string){
    this.snackBar.open(mensaje,'Cerrar',{
      duration: 2500
    });
  }
}
