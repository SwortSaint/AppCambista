import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { RespuestaAccount, Account } from '../interfaces/interfaces';
import { AlertsService } from './alerts.service';
import { AlertController } from '@ionic/angular';
import { WebsocketService } from 'src/app/services/websocket.service';

const url = environment.urlrouterserver;


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  newAccount = new EventEmitter<Account>();

  constructor(public webService: WebsocketService,public alertController: AlertController, public alertsService: AlertsService,private http: HttpClient, public userService: UserService) { }

  getAccount(){
  
    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    })

    return this.http.post<RespuestaAccount>(`${ url }/account/`, null ,{ headers });

  }

  addAccount( data ){

    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    });

   return new Promise( resolve =>{
      this.http.post(`${ url }/account/create`, data, { headers }).subscribe( async resp =>{

        if( resp['ok'] ){
          this.newAccount.emit( resp['account'] );
          resolve(true);
        }else{
          resolve(false);
        }
      
      });
    });
  }

  editAccount( data ){
    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    });

    return new Promise( resolve =>{
      this.http.post(`${ url }/account/update`, data, { headers }).subscribe( async resp =>{
        if( resp['ok'] ){
          resolve(true);
        }else{
          resolve(false);
        }
      
      });
    });
  }

  delAccount( data ){
    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    });

    return new Promise( resolve =>{
      this.http.post(`${ url }/account/delete`, data, { headers }).subscribe( async resp =>{

        if( resp['ok'] ){
          resolve(true);
        }else{
          resolve(false);
        }
      
      });
    });
  }


  async presentAlertConfirm(list, items) {

    const alert = await this.alertController.create({
      header: '¿Desea Eliminar la Cuenta?',
      message: 'Recuerde que al Seleccionar <strong>SI</strong>, Borrara Automaticamente el Registro',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si',
          handler: async () => {
            
            let index = items.indexOf(list);

            await this.alertsService.present();

            if(index > -1){

              const valid = this.delAccount( list);

              await this.alertsService.dismiss();

              if( valid ){
                this.alertsService.SuccessLogin("¡Felicidades!", "Cuenta Eliminada Correctamente", 'Actualizando...');
                items.splice(index, 1); 
              }else{
                this.alertsService.ErrorAlert("¡Error! Al Eliminar Cuenta", "Intente Nuevamente");
              }

            }

          }
        }],
        backdropDismiss: false
    });

    await alert.present();
  }


  getSocketAccount(){
    return this.webService.listen('update-account');
  }

  getSocketNewAccount(){
    return this.webService.listen('add-account');
  }


}


