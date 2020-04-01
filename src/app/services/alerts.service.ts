import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

const URL = environment.url;
const URLroute = environment.urlrouteaccount;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public responseData: any;

  constructor(public modalCtrl: ModalController,public http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

    async SuccessAlert(header: string, message: string) {

      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            alert.dismiss().then(() => { this.presentLoading(); });
          }
        }],
        backdropDismiss: false
      });
  
      await alert.present();
    }

    async ErrorAlert(header: string, message: string) {

      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['Aceptar'],
        backdropDismiss: false
      });
  
      await alert.present();
    }

    async presentLoading() {
      
          this.loadingController.create({ message: 'Actualizando...', duration: 1000, spinner: 'circles',
            backdropDismiss: false }).then((res) => {
              res.present();
      
              res.onDidDismiss().then((dis) => {
                this.modalCtrl.dismiss();
              });
            });
    }

    async showLoader() {
      const loading = await this.loadingController.create({message: 'Cargando...', spinner: 'circles' });
      return await loading.present();
    }
  
    async hideLoader() {
        return this.loadingController.dismiss();
    }

    async presentAlertConfirm(list, items, messageSuccess: string,messageSuccessAccount: string,
      messageErrorAccountHeader: string, messageErrorAccountTitle: string, messageErrorRedHeader: string,
      messageErrorRedTitle: string, site : string,messagePresentAlertAccount: string, params) {

      const alert = await this.alertController.create({
        header: messagePresentAlertAccount,
        message: 'Recuerde que al Seleccionar <strong>SI</strong>, Borrara Automaticamente el Registro',
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button',
          },
          {
            text: 'Si',
            handler: () => {

              let index = items.indexOf(list);
  
             this.showLoader();
  
              if(index > -1){
                 this.http.post(URL+site, JSON.stringify(params)).pipe(
                  finalize(async () => {
                      this.hideLoader();
                  })
              ).subscribe(data => {
  
                 this.responseData = data;
          
                        if(this.responseData.error){
                            this.ErrorAlert(messageErrorAccountHeader, messageErrorAccountTitle); 
                        }else{
                            items.splice(index, 1);
                            this.ErrorAlert(messageSuccess, messageSuccessAccount);
                        }
                  },(err) => {
                            this.ErrorAlert(messageErrorRedHeader, messageErrorRedTitle);
                  });
    
              }
  
            }
          }],
          backdropDismiss: false
      });
  
      await alert.present();
    }

    async dissModal() {
      await this.modalCtrl.dismiss();
    }
  
}
