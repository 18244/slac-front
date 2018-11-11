import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-novo-usuario',
  templateUrl: 'novo-usuario.html',
})
export class NovoUsuarioPage {

  usuario: Usuario = new Usuario( );

  constructor(private _navCtrl: NavController, 
              private _userService: UserServiceProvider, 
              private _alertController: AlertController) { }

  ionViewDidLoad() {}

  irHomePage(): void{
    this._navCtrl.setRoot(HomePage.name);
  }

  confirmaCadastro():void {
    this._alertController.create({
    title: `Cadastrar do usuário ${this.usuario.nome}?` ,
    message: 'Deseja confirmar o cadastro deste usuário?',
    buttons:[
      {
        text: 'Cancelar'
      },
      {
        text: 'Confirma',
        handler: () => this.cadastraUsuario() 
      }
    ]
  }).present();
}

  cadastraUsuario(): void {
    this.usuario.ativo = true;
    this._userService.cadastraUsuario(this.usuario)
    .subscribe(()=> console.log('cadastrado...'),
    (erro)=> console.log(erro));
  }
}
