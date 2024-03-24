import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonReorderGroup, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConexionService } from '../services/conexion.service';
import { CreateDatosPage } from './create-datos/create-datos.page';
import { Datos } from './modal/datos';
import { Orden } from './modal/orden';


@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})
export class VerificacionPage implements OnInit {


  /* ============segment================= */
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;
  /* =========fin========= */
  valueSelected: string = "1"
  orden: Orden[]
  datos: Datos[]
  public custome: Orden[]
  public customers: Datos[]

  estado: boolean;

  nombre: string = ""
  subscriptions: Subscription;

  constructor(private router: Router,
    private conexion: ConexionService,
    private activateRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alerCtrl: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.nombre = this.activateRoute.snapshot.paramMap.get('id_pedido')
    this.agregarDatos()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.agregarDatos()
    })
    this.nombre = this.activateRoute.snapshot.paramMap.get('id_orden')
    this.agregarorden()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.agregarorden()
    })
  }
  gotohome() {
    this.router.navigate(['/home'])
  }
  orderBool = true
  agregarDatos() {
    this.conexion.consultarDato().subscribe(
      data => {
        this.datos = data
      }, error => { console.log(error) }
    )
  };
  agregarorden() {
    this.conexion.consultaorden().subscribe(
      data2 => {
        this.orden = data2
      }, error => { console.log(error) }
    )
  };
  recargar(event) {
    console.log("recargar")
    this.datos = []
    this.conexion.consultarDato().subscribe(
      data => {
        this.datos = data
        event.target.complete()

      }, error => { console.log(error) }
    )
  }
  recargar1(event) {
    console.log("recargar1")
    this.orden = []
    this.conexion.consultaorden().subscribe(
      data2 => {
        this.orden = data2
        event.target.complete()
      }, error => { console.log(error) }
    )
  }
  create() {
    this.modalCtrl.create({ component: CreateDatosPage })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss()
      })
  }
  updateDatos(datos: Datos) {
    this.modalCtrl.create({ component: CreateDatosPage, componentProps: { datos } })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss()
      })
  }
  removeDatos(id_pedido: any) {
    let remove = {}
    remove["id_pedido"] = id_pedido
    this.alerCtrl.create({
      header: 'Elimir!',
      message: '¿Esta seguro que desea eliminar?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.conexion.removeDatos(remove).subscribe(
              data => {
                this.mensaje("El dato fue eliminado con exito")
              }
            )
          },
        },
      ],
    })
      .then((alertE1) => alertE1.present())
  }

  async mensaje(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
  segmentChanged(event: any) {
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  }
}




