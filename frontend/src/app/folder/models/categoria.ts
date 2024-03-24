export class Categoria {
    id_categoria: any
    nombre: string
    cantidad_prestada: any
    cantidad_total: any
    cantidad_disponible : any

    constructor(id_categoria: any, nombre: string, cantidad_prestada: any, cantidad_total: any, cantidad_disponible : any) {
        this.id_categoria = parseInt(id_categoria)
        this.nombre = nombre
        this.cantidad_prestada = parseInt(cantidad_prestada)
        this.cantidad_total = parseInt(cantidad_total)
        this.cantidad_disponible = parseInt(cantidad_disponible)
    }
}
/* SELECT m.id_material, m.nombre, p.nombre AS nombre_presentacion, m.cantidad, m.observaciones, m.precio, m.activo FROM material AS m INNER JOIN presentacion AS p ON m.fk_presentacion = p.id_presentacion WHERE activo = 1 */