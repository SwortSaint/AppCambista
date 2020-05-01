import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { TermsPage } from '../modals/terms/terms.page';
import { AccountProfilePage } from '../modals/account-profile/account-profile.page'
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario = {};
  objectSocial = {
    message : 'Conoce los beneficios que tienes al cambiar tus dolares y/o soles con cambista.com',
    file : null,
    link : "https://www.facebook.com/cambistaperu/",
    subject : null
  };

  constructor(public alertService: AlertsService, private modalCtrl: ModalController, private socialSharing: SocialSharing, public userService: UserService) { }

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
  }

  async termsModal(){

    const modal = await this.modalCtrl.create({ component: TermsPage });
    await modal.present();
 
   }

   async profileModal(){

    const modal = await this.modalCtrl.create({ component: AccountProfilePage });
    await modal.present();
 
   }

   async changePassword(){
    await this.alertService.presentAlertPrompt();
   }

  share(){
    this.socialSharing.share(this.objectSocial.message,
                             this.objectSocial.subject,
                             this.objectSocial.file,
                             this.objectSocial.link )
  }

  logout(){
    this.userService.presentAlertConfirm();
  }

  

}
