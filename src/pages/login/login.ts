import { Usuario } from './../../modelos/usuario';
import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from './../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor( public navCtrl: NavController, 
               public navParams: NavParams,
               private _userServiceProvider: UserServiceProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLoginClick(){

    this._userServiceProvider.efetuaLogin()
      .subscribe( (usuario: Usuario[]) =>{
      this.navCtrl.push(HomePage)
      console.log(usuario);
    }, 
    (err) => console.log(err)    
    );
  }

}
