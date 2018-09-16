import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';
import { ChamadoServiceProvider } from '../../providers/chamado-service/chamado-service';
import { Chamado } from '../../modelos/chamado';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios: Usuario;
  chamados: Chamado[];
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private _navParams: NavParams,
    private _chamadoService: ChamadoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController ) {

    this.usuarios = this._navParams.get('usuarioLogado'); 
    this.getChamados();   
  }

  getChamados(){
    this.loading =  this._loadingCtrl.create( {
      content: 'Atualizando Chamados...'        
    } );
    this.loading.present( );

    this._chamadoService.getChamados()
      .subscribe(chamados => {
      this.chamados = chamados
      this.loading.dismiss();
      },
      ( error )=> {
        console.log(error)
        this.loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha ao carregar chamados!',
          subTitle: 'Tente novamente mais tarde',
          buttons: [
            { text: 'OK' }
          ]
          }).present();
      } ); 
  }
}
