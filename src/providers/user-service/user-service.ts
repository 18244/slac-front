import { Usuario } from './../../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';


@Injectable()
export class UserServiceProvider {

   baseUrl = 'http://localhost:8080/api';

  constructor(
    private _httpClient: HttpClient,
    private _platform: Platform) { 
    
      if(this._platform.is("cordova")){
        this.baseUrl = 'http://localhost:8080'
      }
  }

  efetuaLogin(usuario){
    return this._httpClient.post<Usuario>(`${this.baseUrl}/usuario/login`, usuario);
  }

}
