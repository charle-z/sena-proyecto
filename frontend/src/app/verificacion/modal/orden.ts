export class Orden {
    id_orden: any
    fecha: string
    nombre: string
    nombre_articulo: string
    observaciones: string
    fecha_entrega: string
    fecha_expedicion: string
    costos: any
    horas_laboradas: any
    cant_trabajadores: any
    estado: string
    tipo_orden: string

    constructor(
        id_orden: any,
        fecha: string,
        nombre: string,
        nombre_articulo: string,
        observaciones: string,
        fecha_entrega: string,
        fecha_expedicion: string,
        costos: any,
        horas_laboradas: any,
        cant_trabajadores: any,
        estado: string,
        tipo_orden: string
    ) {
        this.id_orden = parseInt(id_orden)
        this.nombre = nombre
        this.fecha = fecha
        this.observaciones = observaciones
        this.fecha_entrega = fecha_entrega
        this.costos = parseInt(costos)
        this.horas_laboradas = parseInt(horas_laboradas)
        this.cant_trabajadores = parseInt(cant_trabajadores)
        this.estado = estado
        this.nombre_articulo = nombre_articulo
        this.fecha_expedicion = fecha_expedicion
        this.tipo_orden = tipo_orden
    }
}