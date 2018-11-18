import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatorioPage } from './relatorio';

@NgModule({
  declarations: [
    RelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatorioPage),
  ],
  exports: [RelatorioPage]
})
export class RelatorioPageModule {}
