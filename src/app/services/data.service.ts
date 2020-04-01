import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/interfaces';

import { delay } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

const URL = environment.url;
const URLrouteAccount = environment.urlrouteaccount;
const URLrouteTransaction = environment.urlroutetransaction;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }
  
  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getAccount() {
    return this.http.get<any[]>(URL+URLrouteAccount+"?opcion=allaccount&"+"id="+40);
  }

  getTransaction() {
    return this.http.get<any[]>(URL+URLrouteTransaction+"?opcion=all&"+"id="+40);
  }
}


