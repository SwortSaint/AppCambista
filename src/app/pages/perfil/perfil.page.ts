import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { TermsPage } from '../modals/terms/terms.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  objectSocial = {
    message : 'Conoce los beneficios que tienes al cambiar tus dolares y/o soles con cambista.com',
    file : null,
    link : "https://www.facebook.com/cambistaperu/",
    subject : null
  };

  constructor(private modalCtrl: ModalController, private socialSharing: SocialSharing, public userService: UserService) { }

  ngOnInit() {
  }

  async termsModal(){

    const modal = await this.modalCtrl.create({ component: TermsPage });
    await modal.present();
 
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
