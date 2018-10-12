import { Usuario } from './../../modelos/usuario';
import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserServiceProvider } from './../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Usuario;
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _userServiceProvider: UserServiceProvider,
    private _alertCtrl: AlertController ) { console.log('Aqui...')}

  ionViewDidLoad() {}

  onLoginClick( ) {
      this._userServiceProvider.efetuaLogin( )
      .subscribe( ( usuario: Usuario[] ) =>{
        this.navCtrl.setRoot( HomePage.name, {
          usuarioLogado: usuario
        } );
    }, 
    ( err ) => {
      console.log( err );    
        this._alertCtrl.create({
        title: 'Falha no login!',
        subTitle: 'Tente novamente mais tarde',
        buttons: [
          { text: 'OK' }
        ]
      }).present();
    } 
    );
  }

}
