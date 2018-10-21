import { Chamado } from './../../modelos/chamado';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhe-chamado',
  templateUrl: 'detalhe-chamado.html',
})
export class DetalheChamadoPage {

  public chamado: Chamado;
  public responsavel: string = 'Ninguem';
  foto: string = '../assets/img/foto-icon.png';

  constructor( private _viewController : ViewController, 
               private _navParams: NavParams,
               private _alertController: AlertController ) {
    this.chamado = this._navParams.get('chamadoSelecionado');
  }

  ionViewDidLoad() {}

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
        handler: data => {
        console.log("cancel clicked");
        }
    },
    {
        text: "Confirma",
        handler: data => {
          console.log(data);
          this.responsavel = data;
        }
    }]
    });

    let funcionarios =  [{
        type:'radio',
        label:'Juca',
        value:'Juca'
    },
    {
      type:'radio',
        label:'Amaral',
        value:'Amaral'
    }  
  ];

  funcionarios.forEach( funcionario =>alert.addInput(funcionario) );
  alert.present();
  }
}