import { Usuario } from './../../modelos/usuario';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Mensagem } from './../../modelos/mensagem';
import { ChamadoServiceProvider } from './../../providers/chamado-service/chamado-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {

  mensagens: Mensagem[];
  usuarioLogado: Usuario;

  constructor(private _navCtrl: NavController,
              private _chamadoService: ChamadoServiceProvider,
              private _userService: UserServiceProvider) {
    this.usuarioLogado = this._userService.getUsuarioLogado();
    this.getMensagens();            
  }

  ionViewDidLoad() {}

  getMensagens(): void{
    if(this.usuarioLogado.tipo.includes('FUNCIONARIO'))
      this.getMensagensFuncionario();
    else
    this.getMensagensUsuario();  
  }

  irHomePage():void {
    this._navCtrl.setRoot(HomePage.name);
  }

  getMensagensFuncionario(): void{
    this._chamadoService.getMensagensFuncionario(this.usuarioLogado.id)
    .subscribe((mensagens)=> this.mensagens = mensagens,
    (erro)=> console.log(erro)
    );
  }
  getMensagensUsuario(): void{

  }
}
