import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/interfaces';

import { delay } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

const URL = environment.url;
const URLroute = "App-Account?";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }
  
  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getAccount() {
    return this.http.get<any[]>(URL+URLroute+"opcion=allaccount&"+"id="+40);
  }
}


