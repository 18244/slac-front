import { Mensagem } from './../../modelos/mensagem';
import { ChamadoServiceProvider } from './../../providers/chamado-service/chamado-service';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Usuario } from './../../modelos/usuario';
import { Chamado } from './../../modelos/chamado';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';

@IonicPage()
@Component({
  selector: 'page-detalhe-chamado',
  templateUrl: 'detalhe-chamado.html',
})
export class DetalheChamadoPage {

  public responsavel: Usuario;
  public usuario: Usuario;
  public foto: string = '../assets/img/foto-icon.png';
  private funcionarios: Usuario[];
  private chamado: Chamado;
  private mensagem: Mensagem = new Mensagem();
  private responsaveis: AlertInputOptions;

  constructor( private _viewController : ViewController, 
               private _navParams: NavParams,
               private _alertController: AlertController,
               private _userService: UserServiceProvider,
               private _chamadoService: ChamadoServiceProvider ) {
    this.chamado = this._navParams.get('chamadoSelecionado');
    this.getResponsavelChamado(this.chamado.matriculaUsuario);
    this.usuario = this._userService.getUsuarioLogado();
    this.getFuncionarios();
  }

  ionViewDidLoad() {}

  getFuncionarios(): void {
    this._userService.getFuncionarios('FUNCIONARIO')
    .subscribe((funcionarios) => this.funcionarios = funcionarios,
    (erro)=> console.log(erro)
     );
  }

  getResponsavelChamado(matricula: number): void {
    this._userService.getResponsavelChamado(matricula)
    .subscribe((responsavel)=> this.responsavel = responsavel,
    (erro)=> console.log(erro)
    );
  }

  fechaModal():void {
    this._viewController.dismiss();
  }

  atribuiChamado():void {
    let alert = this._alertController.create({

      title: 'Atribuir Chamado',
    message: 'Selecione o responsável',
    
    buttons : [
    {
        text: "Cancela",
        handler: () => {
        console.log("cancel clicked");
        }
    },
    {
        text: "Confirma",
        handler: matricula => this.mudaResponsavel(matricula)
    }]
    });
   
    	this.funcionarios.forEach( funcionario =>alert.addInput(this.adicionaFuncionarios(funcionario)) );
      alert.present();
  }
  adicionaFuncionarios( funcionario: Usuario): AlertInputOptions{

    this.responsaveis = {
      type : 'radio' ,
      label : funcionario.nome,
      value : funcionario.matricula.toString(),
    }
    return this.responsaveis;
  }

  mudaResponsavel(matricula : string): void {
    let funcionario = this.funcionarios.find(funcionario => funcionario.matricula.toString().includes(matricula));
    this.chamado.matriculaUsuario = funcionario.matricula;

    if(this.responsavel)
      this.responsavel.nome = funcionario.nome;
    this.mensagem.responsavel = funcionario.nome;  
    this.mensagem.responsavel_id = funcionario.id;
    this._chamadoService.updateChamado(this.chamado)
      .subscribe(()=> {
        this.criaMensagem();
        this._viewController.dismiss();
      } ,
      (erro)=> console.log(erro)); 
  }

  criaMensagem(): void {
    this.mensagem.data = new Date();
    this.mensagem.texto = `Olá, ${this.mensagem.responsavel} o chamado ${this.chamado.id} foi atribuído a você.`;
    this._chamadoService.postMensagem(this.mensagem)
    .subscribe(()=> console.log('OK'),
    (erro)=> console.log(erro)
    );
  }
}
