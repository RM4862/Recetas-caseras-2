export interface Receta {
  id?:                string;
  nombre:            string;
  categoria:         string;
  tiempoPreparacion: string;
  instrucciones:     string[];
  alt_img?:          string; //url de la imagen
}
