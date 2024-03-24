import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConexionService } from '../services/conexion.service';
import { Categoria } from './models/categoria';
import { Mherramienta } from './models/mherramienta';
import { Mmaterial } from './models/mmaterial';
import { Busque } from './models/busque';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  valueSelected: string = "1"
  valueS: string = "1"
  subscriptions: Subscription;
  categoria: Categoria[]
  public cate: Categoria[]
  material: Mmaterial[]
  public customers: Mmaterial[]
  herramienta: Mherramienta[]
  public herra: Mherramienta[]
  busque: Busque[]
  public buscar: Busque[]
  nombre: string = ""

  constructor(
    private conexion: ConexionService, 
    private activateRoute: ActivatedRoute, 
    private toastController: ToastController) { }

  ngOnInit() {
    this.nombre = this.activateRoute.snapshot.paramMap.get('id_material')
    this.ver_inventario()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.ver_inventario()
    })
    this.nombre = this.activateRoute.snapshot.paramMap.get('id_herramienta')
    this.ver_herramienta()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.ver_herramienta()
    })
    this.nombre = this.activateRoute.snapshot.paramMap.get('')
    this.ver_categoria()
    this.subscriptions = this.conexion.refresh$.subscribe(() => {
      this.ver_categoria()
    })
  };
  ver_herramienta() {
    console.log("recargar")
    this.conexion.ver_herramienta().subscribe(
      data2 => {
        this.herramienta = data2
      }, error => { console.log(error) }
    )
  };
  ver_categoria() {
    console.log("recargar0")
    this.conexion.ver_categoria().subscribe(
      data0 => {
        this.categoria = data0
      }, error => { console.log(error) }
    )
  };
  ver_inventario() {
    console.log("recargar1")
    this.conexion.ver_inventario().subscribe(
      data => {
        this.material = data
      }, error => { console.log(error) }
    )
  };
  recargar0(event) {
    console.log("recargar0")
    this.categoria = []
    this.conexion.ver_categoria().subscribe(
      data0 => {
        this.categoria = data0
        event.target.complete()

      }, error => { console.log(error) }
    )
  };
  recargar1(event) {
    console.log("recargar1")
    this.material = []
    this.conexion.ver_inventario().subscribe(
      data => {
        this.material = data
        event.target.complete()

      }, error => { console.log(error) }
    )
  };
  recargar(event) {
    console.log("recarga2")
    this.herramienta = []
    this.conexion.ver_herramienta().subscribe(
      data2 => {
        this.herramienta = data2
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
  };
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  };
  segmentChanged(event: any) {
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  };
}
