import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExternoPageRoutingModule } from './externo-routing.module';

import { ExternoPage } from './externo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExternoPageRoutingModule
  ],
  declarations: [ExternoPage]
})
export class ExternoPageModule {}
