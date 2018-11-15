import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaUsuarioPage } from './consulta-usuario';

@NgModule({
  declarations: [
    ConsultaUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaUsuarioPage),
  ],
  exports: [ConsultaUsuarioPage]
})
export class ConsultaUsuarioPageModule {}
