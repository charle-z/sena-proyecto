import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./verificacion/verificacion.module').then(m => m.VerificacionPageModule)
  },
  {
    path: 'externo',
    loadChildren: () => import('./externo/externo.module').then(m => m.ExternoPageModule)
  },
  {
    path: 'historial-inventario',
    loadChildren: () => import('./historial-inventario/historial-inventario.module').then(m => m.HistorialInventarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
