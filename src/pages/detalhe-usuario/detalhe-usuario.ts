import { ConsultaUsuarioPage } from './../consulta-usuario/consulta-usuario';
import { Usuario } from './../../modelos/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController, NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-detalhe-usuario',
  templateUrl: 'detalhe-usuario.html',
})
export class DetalheUsuarioPage {

  usuario: Usuario;

  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _viewController : ViewController,
              private _alertController: AlertController, 
              private _userService: UserServiceProvider) {

    this.usuario = this._navParams.get('usuarioSelecionado');
  }

  ionViewDidLoad() { }

  fechaModal():void {
    this._viewController.dismiss();
  }

  confirmarDeletar(): void{
    this._alertController.create({
      title: 'Exclusão de usuário',
      message: `Deseja confirmar a exclusão do usuário ${this.usuario.nome}?`,
      buttons:[
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirma',
          handler: () => this.deletarUsuario() 
        }
      ]
    }).present();
  }

  deletarUsuario(): void {
    this._userService.deletarUsuario(this.usuario)
    .subscribe(() => this._navCtrl.setRoot(ConsultaUsuarioPage.name),
    (erro) => console.log(erro)
    );
  }
}
