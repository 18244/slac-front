import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Chamado } from '../../modelos/chamado';

@Injectable()
export class ChamadoServiceProvider {

  baseUrl = 'http://localhost:8080/api';

  constructor(
    private _httpClient: HttpClient,
    private _platform: Platform) { 
    
      if(this._platform.is("cordova")){
        this.baseUrl = 'http://localhost:8080'
      }
  }

  getChamados(){
    return this._httpClient.get<Chamado[]>(`${this.baseUrl}/chamado`);
  }

}
