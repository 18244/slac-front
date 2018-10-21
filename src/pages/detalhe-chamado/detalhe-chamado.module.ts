import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheChamadoPage } from './detalhe-chamado';

@NgModule({
  declarations: [
    DetalheChamadoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheChamadoPage),
  ],
  exports: [DetalheChamadoPage]
})
export class DetalheChamadoPageModule {}
