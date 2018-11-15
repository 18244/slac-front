import { DetalheUsuarioPage } from './../detalhe-usuario/detalhe-usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../modelos/usuario';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-consulta-usuario',
  templateUrl: 'consulta-usuario.html',
})
export class ConsultaUsuarioPage {

  usuarios: Usuario[];

  constructor(private _navCtrl: NavController,
              private _userService: UserServiceProvider,
              private _modalCtrl: ModalController ) {
    this.getUsuarios();
  }

  ionViewDidLoad() {
    this.getUsuarios();
  }

  irHomePage(): void{
    this._navCtrl.setRoot(HomePage.name);
  }

  getUsuarios(): void {
    this._userService.getUsuarios()
    .subscribe((usuarios) => this.usuarios = usuarios,
    (erro) => console.log(erro) );
  }

  detalhaUsuario(usuario: Usuario):void {
    this._modalCtrl.create(DetalheUsuarioPage.name, {usuarioSelecionado: usuario}).present();
  }
}
