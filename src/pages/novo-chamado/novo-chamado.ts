import { UserServiceProvider } from './../../providers/user-service/user-service';
import { ChamadoServiceProvider } from './../../providers/chamado-service/chamado-service';
import { Chamado } from './../../modelos/chamado';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-novo-chamado',
  templateUrl: 'novo-chamado.html',
})
export class NovoChamadoPage {
  
  public chamado: Chamado = new Chamado( );
  public foto: string = '../assets/img/foto-icon.png';

  constructor( private _navCtrl: NavController,
               private _alertController: AlertController,
               private _chamadoService: ChamadoServiceProvider,
               private _usuarioService: UserServiceProvider ) {
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
    this.chamado.status = 'ABERTO';
    this.chamado.data = new Date( );
    this.chamado.idUsuario = this._usuarioService.getUsuarioLogado().id;
   
    this._chamadoService.postChamado( this.chamado )
    .subscribe(( resposta ) => console.log( resposta ),
    (erro) => console.log(erro)
    );

    this._navCtrl.setRoot(HomePage.name);
  }
}
