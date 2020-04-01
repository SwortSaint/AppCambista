import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AccountAddPage } from '../modals/account-add/account-add.page';
import { AccountEditPage } from '../modals/account-edit/account-edit.page';
import { AlertsService } from 'src/app/services/alerts.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  public textSearch = '';
  public items: any[] = [];
  public searching: any = false;
  contentloaded = false;

  constructor(public alertsService: AlertsService, public dataService: DataService, public modalCtrl: ModalController, public alertController: AlertController ) {
    this.setFilteredItems();

    setTimeout(() => {
      this.contentloaded = true;
    }, 1200);

  }

  onSearchInput( event ){
    this.searching = true;

    setTimeout(()=>{  
      
      this.searching = false;
      this.textSearch = event.detail.value;

      }, 500);
  }

  setFilteredItems() {

    this.dataService.getAccount().subscribe( items =>{ this.items = items; });

  }

//FUNCION PARA LLAMAR EL MODAL DE EDITAR CUENTAS BANCARIAS
  async updAccount(list){

   const modal = await this.modalCtrl.create({ 
     component: AccountEditPage,
     componentProps:{
       list: list
     }});

   await modal.present();

  }


//FUNCION PARA LLAMAR EL MODAL DE AGREGAR CUENTAS BANCARIAS
  async addModal(){

    const modal = await this.modalCtrl.create({ component: AccountAddPage });
    await modal.present();
 
   }


  async delAcount(list){

    let params = {
      "id_account_user": list.id_account_user,
      "setting": "delaccount"
    }

   await this.alertsService.presentAlertConfirm(list, this.items,environment.messageSuccess,
            environment.messageSuccessAccount,
            environment.messageErrorAccountHeader,
            environment.messageErrorAccountTitle,
            environment.messageErrorRedHeader,
            environment.messageErrorRedTitle,
            environment.urlrouteaccount,
            environment.messagePresentAlertAccount,
            params);

    }
  

}
