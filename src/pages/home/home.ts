import { DetalheChamadoPage } from './../detalhe-chamado/detalhe-chamado';
import { NovoChamadoPage } from './../novo-chamado/novo-chamado';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController, Loading, AlertController, ModalController } from 'ionic-angular';
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
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _chamadoService: ChamadoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, 
    private _modalCtrl: ModalController) {
    this.carregaChamados();   
  }

  ionViewDidLoad( ) {
    this.chamados = this._navParams.get( 'novosChamados' ); 
  }

  carregaChamados(){
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
          title: 'Erro ao carregar dados!',
          subTitle: 'Tente novamente mais tarde',
          buttons: [
            { text: 'OK' }
          ]
          }).present();
      } ); 
  }

  novoChamado():void {
    this._navCtrl.setRoot(NovoChamadoPage.name);
  }

  detalhaChamado(chamado: Chamado):void {
    this._modalCtrl.create(DetalheChamadoPage.name, {chamadoSelecionado: chamado}).present();
  }
}
