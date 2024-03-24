import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inventario', url: './folder', icon: 'file-tray-full' },
    { title: 'Historial prestamo', url: '/historial-inventario', icon: 'timer' },
    { title: 'Historial ordenes', url: 'verificacion', icon: 'receipt' },
    { title: 'Acerca de...', url: 'externo', icon: 'alert' },
    { title: 'Salir', url: '/login', icon: 'log-out' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }
}


