import { Camera, CameraOptions } from '@ionic-native/camera';
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
  public chamados: Chamado[];
  public foto = '../assets/img/foto-icon.png';
  public temFoto: boolean = false;
  
  public prioridades = [
    { valor :'BAIXA'   , tipo: 'Baixa'   },
    { valor :'MÉDIA'   , tipo: 'Média'   },
    { valor :'ALTA'    , tipo: 'Alta'    },
    { valor :'URGENTE' , tipo: 'Urgente' }
  ];

  constructor( private _navCtrl: NavController,
               private _alertController: AlertController,
               private _chamadoService: ChamadoServiceProvider,
               private _usuarioService: UserServiceProvider,
               private _camera: Camera ) { }

  ionViewDidLoad() {}

  irHomePage(): void{
    this._navCtrl.setRoot(HomePage.name);
  }

  insereFoto():void{
   const options : CameraOptions = {
    quality: 100,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE,
   }
   this._camera.getPicture(options)
        .then((imageData) => {
          if(imageData){
            let base64image = 'data:image/jpeg;base64,' + imageData;
            this.foto = base64image; 
            this.temFoto = true;
            this.chamado.foto = imageData;
          }

        }, (erro) => console.log(erro))
        .catch((erro) => console.log(erro));
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
    this.chamado.matriculaUsuario = 0;
    this.chamado.idUsuario = this._usuarioService.getUsuarioLogado().id;
   
    this._chamadoService.postChamado( this.chamado )
    .subscribe(( ) => this.carregaChamados( ),
    (erro) => console.log(erro)
    );
  }

  carregaChamados( ): void {
    this._chamadoService.getChamados( )
    .subscribe( chamados => {
      this.chamados = chamados
      this._navCtrl.setRoot( HomePage.name , { novosChamados: this.chamados } );
    } ,
    (erro) => console.log(erro)
    );
  }
}
