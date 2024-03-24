export class Ver_herra {
    id_inventario: any
    nombre: string
    fk_usuario: any
    observaciones: string
    activo: any
    fecha_in: string
    fecha_fin: string
    herramienta: string
    fecha: string
    buscar: string
    constructor(
        id_inventario: any,
        nombre: string,
        fk_usuario: any,
        observaciones: string,
        activo: any,
        fecha_in: string,
        fecha_fin: string,
        herramienta: string,
        fecha: string,
        buscar: string
    


    ) {
        this.id_inventario = parseInt(id_inventario)
        this.nombre = nombre
        this.fk_usuario = parseInt(fk_usuario)
        this.observaciones = observaciones
        this.activo = parseInt(activo)
        this.fecha_fin = fecha_fin
        this.fecha_in = fecha_in
        this.herramienta = herramienta
        this.fecha = fecha
        this.buscar= buscar
    }
}
