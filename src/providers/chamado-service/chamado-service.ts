import { Mensagem } from './../../modelos/mensagem';
import { Chamado } from './../../modelos/chamado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChamadoServiceProvider {

  baseUrl = 'http://192.168.11.3:8080/api';

  constructor(
    private _httpClient: HttpClient,
    private _platform: Platform) { 
    
      if(this._platform.is("cordova")){
        this.baseUrl = 'http://192.168.11.3:8080/api'
      }
  }

  getChamados( ) : Observable<Chamado[]> {
    return this._httpClient.get<Chamado[]>( `${this.baseUrl}/chamado` );
  }

  updateChamado(chamado: Chamado): Observable<Chamado>{
    return this._httpClient.put<Chamado>(`${this.baseUrl}/chamado`, chamado);
  }

  getChamadosUsuario(usuario_id : number): Observable<Chamado[]>{
    return this._httpClient.get<Chamado[]>(`${this.baseUrl}/chamado/` + usuario_id );
  }
  
  postChamado( chamado: Chamado ): Observable<Chamado> {
    return this._httpClient.post<Chamado>( `${this.baseUrl}/chamado`, chamado );
  }
  
  postMensagem(mensagem: Mensagem): Observable<Mensagem> {
    console.log(mensagem);
    return this._httpClient.post<Mensagem>( `${this.baseUrl}/mensagem`, mensagem );
  }
  
  getMensagensFuncionario(id: number):Observable<Mensagem[]>{
  return this._httpClient.get<Mensagem[]>(`${this.baseUrl}/mensagem/funcionario/` + id );  
  }

}