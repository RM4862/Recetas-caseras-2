import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Receta } from '../../interfaces/recetas.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Receta //datos de la receta
  ){}

  ngOnInit():void{
    console.log(this.data);

  }

  borrar(){
    this.dialogRef.close(true); //valor al presionar borrar
  }

  cerrar(){
    this.dialogRef.close(); //valor al presionar cerrar
  }

}
