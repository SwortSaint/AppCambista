import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTransaction } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertsService } from './alerts.service';
import { WebsocketService } from 'src/app/services/websocket.service';


const url = environment.urlrouterserver;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public modalCtrl: ModalController, public webService: WebsocketService,public alertsService: AlertsService,public alertController: AlertController,private http: HttpClient, public userService: UserService) { }

  getTransaction(){
  
    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    })

    return this.http.post<RespuestaTransaction>(`${ url }/transaction/`, null ,{ headers });

  }

  addTransaction( data ){

    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    });

   return new Promise( resolve =>{
      this.http.post(`${ url }/transaction/create`, data, { headers }).subscribe( async resp =>{

        if( resp['ok'] ){
          resolve(true);
        }else{
          resolve(false);
        }
      
      });
    });
  }


  cancelTransaction( data ){
    const headers = new HttpHeaders({
      'x-token' : this.userService.token
    });

    const params = {_id: data['_id'], status: 'CANCELADO'};

    return new Promise( resolve =>{
      this.http.post(`${ url }/transaction/update`, params, { headers }).subscribe( async resp =>{

        if( resp['ok'] ){
          resolve(true);
        }else{
          resolve(false);
        }
      
      });
    });
  }


  async presentAlertConfirm(list) {

    const alert = await this.alertController.create({
      header: '¿Esta Seguro en Cancelar la Transacción?',
      message: 'Recuerde que al Seleccionar <strong>SI</strong>, Borrara Automaticamente la Transacción',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si',
          handler: async () => {

            await this.alertsService.present();

              const valid = this.cancelTransaction( list );

              await this.alertsService.dismiss();

              if( valid ){
                this.alertsService.SuccessLogin("¡Felicidades!", "La Transacción se ha Cancelado de Manera Exitosa", 'Actualizando...');
              }else{
                this.alertsService.ErrorAlert("¡Error! Al Cancelar la Transacción", "Intente Nuevamente");
              }

          }
        }],
        backdropDismiss: false
    });

    await alert.present();
  }

  async SuccessAlertNotification(moneda_up,moneda_down) {

    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: 'Se ha Enviado con Exito la Operación',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          alert.dismiss().then(() => { this.AlertNotification(moneda_up,moneda_down); });
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  async AlertNotification(moneda_up,moneda_down) {
    const alert = await this.alertController.create({
      header: "Notificación de Avizo",
      message: '<p> Usted Envio '+moneda_up+' y Recibira '+moneda_down+' </p>'+
               '<p>Si surge un inconveniente contacte con nosotros al <strong>970782603</strong></p>'+
               '<strong>Le enviaremos un correo eléctronico con el status de la transacción realizada</strong>',
      buttons: [{
        text: 'OK',
        handler: () => {

          this.alertsService.presentLoadingLogin('Por favor espere...');

          setTimeout(() => {
            this.modalCtrl.dismiss().then(() => this.modalCtrl.dismiss());
          }, 1000);
          
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }


  getSocketCancelTransaction(){
    return this.webService.listen('cancel-transaction');
  }



}
