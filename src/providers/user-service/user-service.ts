import { Menu } from './../../modelos/menu';
import { Usuario } from './../../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserServiceProvider {

   baseUrl = 'http://localhost:8080/api';
   usuarioLogado : Usuario;

  constructor(
    private _httpClient: HttpClient,
    private _platform: Platform) { 
    
      if(this._platform.is("cordova")){
        this.baseUrl = 'http://localhost:8080'
      }
  }

  cadastraUsuario(usuario: Usuario): Observable<Usuario>{
    return this._httpClient.post<Usuario>(`${this.baseUrl}/usuario`, usuario)
  }

  efetuaLogin(usuario): Observable<Usuario> {
    return this._httpClient.post<Usuario>(`${this.baseUrl}/usuario/login`, usuario)
    .do( usuario =>  this.usuarioLogado = usuario );
  }

  getUsuarioLogado(): Usuario {
    return this.usuarioLogado;
  }
  
  getMenusAdministrador(administrador: boolean): Observable<Menu[]>{
    return this._httpClient.get<Menu[]>(`${this.baseUrl}/menu/administrador/` + administrador );
  }

  getMenus(tipo: string): Observable<Menu[]>{
    return this._httpClient.get<Menu[]>(`${this.baseUrl}/menu/` + tipo);
  }
}
