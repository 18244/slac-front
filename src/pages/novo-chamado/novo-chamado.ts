import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-novo-chamado',
  templateUrl: 'novo-chamado.html',
})
export class NovoChamadoPage {
  
  public tipo: string;
  public descricao: string;
  public local: string;
  public andar: string;
  public prioridade: string;
  public foto: string = '../assets/img/foto-icon.png';

  constructor( private _navCtrl: NavController,
               private _alertController: AlertController) {
  }

  ionViewDidLoad() {}

  irLoginPage(): void{
    this._navCtrl.setRoot(HomePage.name);
  }

  insereFoto():void{
    console.log("Foto");
  }

  confirmaChamado():void {
      this._alertController.create({
      title: 'Confirmar o chamado',
      message: 'Deseja confirmar a abertura deste chamado ?',
      buttons:[
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirma',
          handler: () => this.cadastraChamado() 
        }
      ]
    }).present();
  }

  cadastraChamado(): void{
    console.log('Cadastra...') 
    this._navCtrl.setRoot(HomePage.name);
  }
}
