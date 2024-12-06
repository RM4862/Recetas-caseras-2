export interface Receta{
  id?:                string; //opcional para que el backend se encargue de asignarle un id
  nombre:            string;
  categoria:         Categoria;
  tiempoPreparacion: string;
  ingredientes:      string[];
  instrucciones:     string[];
  alt_img:           string;
}

export enum Categoria {
  Ensalada = "Ensalada",
  Sopa = "Sopa",
  PlatoPrincipal = "Plato principal",
  Postre = "Postre",
  Bebida = "Bebida",
  Aperitivo = "Aperitivo"
}
