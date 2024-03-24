import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConexionService } from '../services/conexion.service';
import { FolderPage } from '../folder/folder.page';
import { Ver_herra } from './models/ver_herra';
import { Ver_histo } from './models/ver_histo';


@Component({
  selector: 'app-historial-inventario',
  templateUrl: './historial-inventario.page.html',
  styleUrls: ['./historial-inventario.page.scss'],
})
export class HistorialInventarioPage implements OnInit {
  component = FolderPage;

  valueSelected: string = "1"

  herra: Ver_herra[]
  public her: Ver_herra[]

  histo: Ver_histo[]
  public his: Ver_histo[]

  nombre: string = ""
  subscriptions: Subscription;
  searchTerm: string;

  constructor(private router: Router,
    private conexion: ConexionService,
    private activateRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alerCtrl: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {

    this.nombre = this.activateRoute.snapshot.paramMap.get('id_inventario')
    this.taer_herra()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.taer_herra()
    })

    this.nombre = this.activateRoute.snapshot.paramMap.get('id_inventario')
    this.taer_histo()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.taer_histo()
    })

  }
  /// datos para herramientas //
  taer_herra() {
    this.conexion.taer_herra().subscribe(
      data2 => {
        this.herra = data2
      }, error => { console.log(error) }
    )
  };

  trae_herra(event) {
    console.log("recargar2")
    this.herra = []
    this.conexion.taer_herra().subscribe(
      data2 => {
        this.herra = data2
        event.target.complete()
      }, error => { console.log(error) }
    )
  };



  taer_histo() {
    this.conexion.taer_histo().subscribe(
      data => {
        this.histo = data
      }, error => { console.log(error) }
    )
  };

  trae_histo(event) {
    console.log("recar")
    this.herra = []
    this.conexion.taer_histo().subscribe(
      data => {
        this.histo = data
        event.target.complete()
      }, error => { console.log(error) }
    )
  };



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








