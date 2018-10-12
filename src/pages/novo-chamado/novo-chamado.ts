import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-novo-chamado',
  templateUrl: 'novo-chamado.html',
})
export class NovoChamadoPage {
  tipo: string;
  descricao: string;
  local: string;
  andar: string;
  prioridade: string;
  foto: string = '../assets/img/foto-icon.png';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {}

  irLoginPage(): void{
    this.navCtrl.setRoot(HomePage.name);
  }

  insereFoto():void{
    console.log("Foto");
  }

}
