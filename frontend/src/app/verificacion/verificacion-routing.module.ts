import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificacionPage } from './verificacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerificacionPage
  },
  {
    path: 'create-datos',
    loadChildren: () => import('./create-datos/create-datos.module').then( m => m.CreateDatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificacionPageRoutingModule {}
