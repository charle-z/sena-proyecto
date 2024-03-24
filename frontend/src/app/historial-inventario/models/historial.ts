export class Historial {
    id_inventario: any
    fk_usuario: any
    observaciones: string
    nombre_usuario: string
    lista_material: string
    fecha_in: string
    fecha_fin: string
    cantidad: any
    preciototal: any
    material: string
    fecha: string

    constructor(
        id_inventario: any,
        fk_usuario: any,
        observaciones: string,
        nombre_usuario: string,
        lista_material: string,
        cantidad: any,
        preciototal: any,
        material: string,
        fecha: string

    ) {
        this.id_inventario = parseInt(id_inventario)
        this.fk_usuario = parseInt(fk_usuario)
        this.observaciones = observaciones
        this.nombre_usuario = nombre_usuario
        this.lista_material = lista_material
        this.cantidad = parseInt(cantidad)
        this.preciototal = parseInt(preciototal)
        this.material = material
        this.fecha = fecha

    }
}

/* ver_historial_material
SELECT i.id_inventario, i.fk_usuario, i.observaciones, u.nombre AS nombre_usuario, i.fecha_in, i.fecha_fin, i.activo, lm.cantidad, lm.preciototal, m.nombre AS material 

*/