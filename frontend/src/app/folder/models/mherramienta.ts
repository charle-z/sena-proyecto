export class Mherramienta {

    /*  */
    id_herramienta: any
    nombre: string
    estado: any
    fk_categoria: any
    observaciones: string
    nombre_categoria: string

    activo: any

    constructor(id_herramienta: any, 
        nombre: string, 
        estado: any, 
        fk_categoria: any,
         observaciones: string, 
         nombre_categoria: string, 
         activo: any) {

        this.id_herramienta = parseInt(id_herramienta)
        this.nombre = nombre
        this.estado = parseInt(estado)
        this.fk_categoria = parseInt(fk_categoria)
        this.observaciones = observaciones
        this.nombre_categoria = nombre_categoria
        this.activo = parseInt(activo)
    }


}


