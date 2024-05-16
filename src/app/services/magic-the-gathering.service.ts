import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardFormInterface } from '../interfaces/card-form-interface.interface';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  private _api: string;

  constructor(private http: HttpClient) {
    this._api = 'https://api.magicthegathering.io/v1';
  }

  getSets(dados: CardFormInterface): Observable<any> {
    dados.name = dados.name ? dados.name : '';

    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let params: HttpParams = new HttpParams().set('name', dados.name).set('block', dados.block);

    return this.http.get(`${this._api}/sets`, { headers, params });
  }

  getBoosters(id: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(`${this._api}/sets/${id}/booster`, { headers });
  }
}
