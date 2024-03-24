export class Mmaterial {
    id_material: any
    nombre: string
    nombre_presentacion: string
    cantidad: any
    observaciones: string
    precio: any
    actividad: any
    buscar_m: string

    constructor(id_material: any, nombre: string, nombre_presentacion: string, cantidad: any, observaciones: string, precio: any, buscar_m: string) {
        this.id_material = parseInt(id_material)
        this.nombre = nombre
        this.nombre_presentacion = nombre_presentacion
        this.cantidad = parseInt(cantidad)
        this.observaciones = observaciones
        this.precio = parseInt(precio)
        this.buscar_m = buscar_m
    }
}
