export class Aprobar {
  static toLowerCase() {
    throw new Error('Method not implemented.')
  }
  id_pedido: any

  estado: string




  constructor(
    id_pedido: any,

    estado: string,


  ) {

    this.id_pedido = parseInt(id_pedido)

    this.estado = estado


  }
}







