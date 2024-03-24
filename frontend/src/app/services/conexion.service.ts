import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  [x: string]: any;
  private _refresh$ = new Subject<void>();

  get refresh$() {
    return this._refresh$
  };
  url = "https://localhost/movil" //direccion del backend
  /* 1r\O2PVf96VUEyxm */
  /* http://127.0.0.1:80 */
  /* https://sios19.000webhostapp.com/movil */

  constructor(public http: HttpClient) { }

  ////busqueda

  buscar_herra(buscar): Observable<any> {
    return this.http
      .get(this.url + "/buscar_herra/" + buscar)
  }



  //Login endpoint 
  getUser(id: number, contrasena: string): Observable<any> {
    return this.http.get(this.url + `/getUser/${id}/${contrasena}`)
  }

  //////   buscadores ////
  taer_herra(): Observable<any> {
    return this.http
      .get(this.url + "/taer_herra")
  }
  ver_he(buscar1b1): Observable<any> {
    return this.http
      .get(this.url + "/ver_he/" + buscar1b1)
  }



  taer_histo(): Observable<any> {
    return this.http
      .get(this.url + "/taer_histo")

  }


  ver_herramienta(): Observable<any> {
    return this.http
      .get(this.url + "/ver_herramienta")

  }


  ver_herramienta_busque(busqueda): Observable<any> {
    return this.http
      .get(this.url + "/ver_herramienta_busque/" + busqueda)
  }


  //////// fin buscador /////

  consultarDato(): Observable<any> {
    return this.http
      .get(this.url + "/consultaDato")

  }
  ver_categoria(): Observable<any> {
    return this.http
      .get(this.url + "/ver_categoria")

  }
  ver_inventario(): Observable<any> {
    return this.http
      .get(this.url + "/ver_inventario")

  }


  ver_historial(): Observable<any> {
    return this.http
      .get(this.url + "/ver_historial")

  }
  ver_hherramienta(): Observable<any> {
    return this.http
      .get(this.url + "/ver_hherramienta")

  }
  consultaorden(): Observable<any> {
    return this.http
      .get(this.url + "/consultaorden")

  }
  createDatos(data): Observable<any> {
    return this.http
      .post(this.url + "/createDatos", JSON.stringify(data))
      .pipe(tap(() => {
        this._refresh$.next()
      }))
  }
  updateDato(data): Observable<any> {
    return this.http
      .post(this.url + "/updateDato", JSON.stringify(data))
      .pipe(tap(() => {
        this._refresh$.next()
      }))
  }
  removeDatos(data) {
    return this.http
      .post(this.url + "/removeDato", JSON.stringify(data))
      .pipe(tap(() => {
        this._refresh$.next()
      }))
  }

}







/*   buscar_m(buscar_m): Observable<any> {
    return this.http
      .get(this.url + "/buscar_m/" + buscar_m)
  }
  buscar_h(buscar_h): Observable<any> {
    return this.http
      .get(this.url + "/buscar_h/" + buscar_h)
  } */