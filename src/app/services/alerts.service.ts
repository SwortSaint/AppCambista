import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public responseData: any;

  constructor(public userService: UserService, public modalCtrl: ModalController,public http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }


    /**
     * FUNCION PARA INICIAR SESION 
     **/

    async SuccessLogin(header: string, message: string, messagetext: string) {

      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            alert.dismiss().then(() => { this.presentLoadingLogin( messagetext ); });
          }
        }],
        backdropDismiss: false
      });
  
      await alert.present();
    }


    /**
     * FUNCION PARA ALERTAS CON STATUS SUCCESS 
     **/

    async SuccessAlert(header: string, message: string, messagetext: string) {

      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            alert.dismiss().then(() => { this.presentLoading( messagetext ); });
          }
        }],
        backdropDismiss: false
      });
  
      await alert.present();
    }

    /**
     * FUNCION PARA ALERTAS CON STATUS ERROR 
     **/

    async ErrorAlert(header: string, message: string) {

      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['Aceptar'],
        backdropDismiss: false
      });
  
      await alert.present();
    }


    /**
     * FUNCION DE ION-LOADING EN INICIAR SESSION 
     **/

    async presentLoadingLogin( messagetext: string) {
      
      const resp = await this.loadingController.create({
        message: messagetext,
        duration: 1000,
        spinner: 'circles'
      });

      await resp.present();

    }

    /**
     * FUNCION DE ION-LOADING EN LOS DEMAS MODULOS
     **/

    async presentLoading( messagetext: string) {
      
      const resp = await this.loadingController.create({
        message: messagetext,
        duration: 1000,
        spinner: 'circles'
      });

      await resp.present();

      await resp.onDidDismiss().then((dis) => {
        this.modalCtrl.dismiss();
      });
    }

    /**
     * FUNCION PARA CAMBIAR CONTRASEÑA
     **/

    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        inputs: [
          {
            name: 'pass_now',
            placeholder: 'Contraseña actual',
            type: 'password'
          },
          {
            name: 'pass_new',
            placeholder: 'Contraseña nueva',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancelar'
          }, {
            text: 'Aceptar',
            handler: async (data) => {
              if (data.pass_now !== "" && data.pass_new !== "" && data.pass_now == data.pass_new && data.pass_new == data.pass_now) {
                
                await this.present();

                const valid = this.userService.userChange( data.pass_now );

                await this.dismiss();

                if( valid ){
                  this.SuccessLogin("¡Felicidades!", "Contraseña Cambiada Correctamente", 'Actualizando...'); 
                }else{
                  this.ErrorAlert("¡Error! Al Cambiar Contraseña", "Verifigue Nuevamente los Campos");
                }

              }else{
                return false;
              }
            }
          }
        ],
        backdropDismiss: false
      });
  
      await alert.present();
    }


    async present() {
      // Dismiss all pending loaders before creating the new one
      await this.dismiss();
  
      await this.loadingController
        .create({message: 'Cargando...', spinner: 'circles' })
        .then(res => {
          res.present();
        });
    }
  
    /**
     * Dismiss all the pending loaders, if any
     **/
    async dismiss() {
      while (await this.loadingController.getTop() !== undefined) {
        await this.loadingController.dismiss();
      }
    }


    /**
     * FUNCION PARA CERRAR MODALES
     **/

    async dissModal() {
      await this.modalCtrl.dismiss();
    }

  
}
