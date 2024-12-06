import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from '../../services/recetas.service';
import { Receta } from '../../interfaces/recetas.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  receta!: Receta; // La receta cargada por ID

  constructor(
    private activatedRoute: ActivatedRoute,
    private recetasService: RecetasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.recetasService.getRecetaPorId(id))
      )
      .subscribe((receta) => (this.receta = receta));
  }

  regresar() {
    this.router.navigate(['/recetas/listado']);
  }
}
