export class Datos {
  static toLowerCase() {
    throw new Error('Method not implemented.')
  }
  id_pedido: any
  fecha: string
  fk_cliente: string
  descripcion: string
  tipo_orden: string
  nombre_articulo: string
  lugar: string
  altura: string
  estado: string
  nombre: string

 

  constructor(
    id_pedido: any,
    fecha: string,
    fk_cliente: string,
    descripcion: string,
    tipo_orden: string,
    nombre_articulo: string,
    lugar: string,
    altura: string,
    estado: string,
    nombre: string,

  ) {

    this.id_pedido = parseInt(id_pedido)
    this.fecha = fecha
    this.fk_cliente = fk_cliente
    this.descripcion = descripcion
    this.tipo_orden = tipo_orden
    this.nombre_articulo = nombre_articulo
    this.lugar = lugar
    this.altura = altura
    this.estado = estado
    this.nombre = nombre

  }
}







