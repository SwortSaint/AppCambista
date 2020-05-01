import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { AccountAddPage } from '../modals/account-add/account-add.page';
import { AccountEditPage } from '../modals/account-edit/account-edit.page';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { Account } from '../../interfaces/interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit{

  public textSearch = '';
  public searching: any = false;
  contentloaded = false;
  account: Account[] = [];

  constructor(public userService: UserService,public accountService: AccountService,public alertsService: AlertsService, public dataService: DataService, public modalCtrl: ModalController ) {
    this.setFilteredItems();

    setTimeout(() => {
      this.contentloaded = true;
    }, 1200);

  }

  ngOnInit() {

    this.accountService.newAccount.subscribe( account =>{
       this.account.push( account );
    });

    ///FUNCTION DEL SERVICE PARA LLAMAR EL SOCKET
    this.accountService.getSocketAccount().subscribe( () =>{
      this.account = [];
      this.setFilteredItems();
    });

  }

  onSearchInput( event ){
    this.searching = true;

    setTimeout(()=>{  
      
      this.searching = false;
      this.textSearch = event.detail.value;

      }, 500);
  }

  setFilteredItems() {

    this.accountService.getAccount().subscribe( resp =>{ this.account.push( ...resp.account); });

  }

//FUNCION PARA LLAMAR EL MODAL DE EDITAR CUENTAS BANCARIAS
  async updAccount(list){

   const modal = await this.modalCtrl.create({ 
     component: AccountEditPage,
     componentProps:{
       list,
       index : this.account
     }});

   await modal.present();

  }


//FUNCION PARA LLAMAR EL MODAL DE AGREGAR CUENTAS BANCARIAS
  async addModal(){

    const modal = await this.modalCtrl.create({ component: AccountAddPage });
    await modal.present();
 
   }


  async delAcount(list){

   await this.accountService.presentAlertConfirm(list, this.account);

    }
  

}
