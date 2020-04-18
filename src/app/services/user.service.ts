import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

const url = environment.urlrouterserver;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  usuario: Usuario = {};

  constructor(private loadingController: LoadingController, private alertController: AlertController, private http: HttpClient, private storage: Storage, private naCtrl: NavController) { }

 
  login( email: string, password: string){

    const data = {email , password };

    return new Promise( resolve =>{
      
        this.http.post(`${ url }/user/login`, data).subscribe( async resp =>{
          console.log(resp);

          if( resp['ok'] ){
            await this.guardarToken( resp['token'] );
            resolve(true);
          }else{
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    })
  

  }

  
  async guardarToken( token: string){
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken(){

     this.token = await this.storage.get('token') || null;

  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if (!this.token){
      this.naCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve =>{

      const headers = new HttpHeaders({
        'x-token' : this.token
      })

      this.http.get(`${ url }/user/`, { headers }).subscribe( resp =>{

        if( resp['ok'] ){
          this.usuario = resp['usuario'];
          resolve(true);
        }else{
          this.naCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });

  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.naCtrl.navigateRoot('/login', { animated: true });
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que deseas Cerrar Sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: 'Si',
          handler: () => {
            this.presentLoading();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
      
    this.loadingController.create({ message: 'Saliendo...', duration: 1000, spinner: 'circles',
      backdropDismiss: false }).then((res) => {
        res.present();

        res.onDidDismiss().then((dis) => {
          this.logout();
        });
      });
}

}
