import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheUsuarioPage } from './detalhe-usuario';

@NgModule({
  declarations: [
    DetalheUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheUsuarioPage),
  ],
})
export class DetalheUsuarioPageModule {}
