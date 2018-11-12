import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Menu } from './../../modelos/menu';
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

  usuarioLogado: Usuario;
  chamados: Chamado[];
  loading: Loading;
  menus: Menu[];
  segment: string = '';
 
  
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _chamadoService: ChamadoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, 
    private _modalCtrl: ModalController, 
    private _userService: UserServiceProvider) {
    this.segment = 'todos';  
    this.usuarioLogado = this._userService.getUsuarioLogado();
    this.buscarMenus();  
    this.carregaChamados();   
  }

  ionViewDidLoad( ) {
    this.chamados = this._navParams.get( 'novosChamados' ); 
    this.segment = 'todos';
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

  filtraChamados(event: any): void {
    console.log(event._value);
  }

  novoChamado():void {
    this._navCtrl.setRoot(NovoChamadoPage.name);
  }

  detalhaChamado(chamado: Chamado):void {
    this._modalCtrl.create(DetalheChamadoPage.name, {chamadoSelecionado: chamado}).present();
  }

  buscarMenus(): void{
    if(this.usuarioLogado.administrador)
    {
      this._userService.getMenusAdministrador(this.usuarioLogado.administrador)
      .subscribe(menus => this.menus = menus),
      (erro) => console.log(erro);
    }
    else
    {
      this._userService.getMenus(this.usuarioLogado.tipo)
      .subscribe(menus => this.menus = menus),
      (erro) => console.log(erro);
    }
  }
  irParaPagina(page): void{
    this._navCtrl.setRoot(page);
 } 
}
