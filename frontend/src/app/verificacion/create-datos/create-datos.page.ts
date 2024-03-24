import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Datos } from '../modal/datos';

@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.page.html',
  styleUrls: ['./create-datos.page.scss'],
})
export class CreateDatosPage implements OnInit {
  @Input() datos: Partial<Datos>
  isUpdate: boolean = false

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  constructor(private loadingCtrl: LoadingController,
    private conexion: ConexionService,
    private toast: ToastController,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.updateDatos()
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  form = new FormGroup({
    // id_pedido: new FormControl('', []),

    fecha: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    fk_cliente: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    tipo_orden: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    nombre_articulo: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    lugar: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    altura: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    estado: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),

  })
  async onSubmit() {
    const dat = this.form.value
    if (this.isUpdate) {
      let id_pedido = this.datos.id_pedido
      this.datos = dat
      this.datos.id_pedido = id_pedido
      const loading = await this.loadingCtrl.create({
        message: 'Atualizando Datos...'
      })
      await loading.present()

      this.conexion.updateDato(this.datos).subscribe(data => {
        this.presenttoast('El datos fue modificado con exito', 'Dato modificado,');
        /*  this.presentAlert() */
        loading.dismiss();
        this.closeModal();
      }, error => {
        this.error('Error', 'Oocurrio un error al modificar el dato');

      })

    }
    else {
      this.datos = dat
      /* this.datos.id_pedido = 0 */
      const loading = await this.loadingCtrl.create({
        message: 'Creando Pedido...'
      })
      await loading.present()
      this.conexion.createDatos(this.datos).subscribe(data => {
        this.presenttoast("El pedido fue guardado con exito", "Pedido guardado")
        loading.dismiss()
        this.closeModal()
      }, error => {
        this.error('Error', 'Oocurrio un error al modificar el pedido');

      })

    }
  }
  async error(encabezado: string, messaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: messaje,
      duration: 2000
    })
    toast.present()
  }
  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }
  async presenttoast(encabezado: string, messaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: messaje,
      duration: 2000
    })
    toast.present()
  }


  updateDatos() {
    console.log("emtra")
    if (this.datos) {//si recibio informacion
      this.isUpdate = true; this.form.patchValue({
        fecha: this.datos.fecha,
        descripcion: this.datos.descripcion,
        tipo_orden: this.datos.tipo_orden,
        nombre_articulo: this.datos.nombre_articulo,
        lugar: this.datos.lugar,
        altura: this.datos.altura,
        fk_cliente: this.datos.fk_cliente,
        estado: this.datos.estado
      })
    }
  }
}

