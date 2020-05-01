import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Componente } from 'src/app/interfaces/interfaces';
import { Observable, Subscription } from 'rxjs';
import { CalcService } from 'src/app/services/calc.service';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';
import { ChangeCashPage } from '../modals/change-cash/change-cash.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>;
  account: Account[] = [];
  list_value: Account;
  accountSubscription: Subscription;

  constructor(public modalCtrl: ModalController ,public alertsService: AlertsService,private menuCtrl: MenuController, public calService: CalcService,public accountService: AccountService) { 
    this.setFilteredItems();
  
  }

  ngOnInit() {
    this.calService.all_changemoney();
     ///FUNCTION DEL SERVICE PARA LLAMAR EL SOCKET
     this.accountService.getSocketNewAccount().subscribe( () =>{
      this.account = [];
      this.setFilteredItems();
    });
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  setFilteredItems() {

    this.accountService.getAccount().subscribe( resp =>{ this.account.push( ...resp.account); });

  }

change_money(){

    var campoArriba = <HTMLInputElement>document.getElementById('campoArriba');
    var campoAbajo  = <HTMLInputElement>document.getElementById('campoAbajo');
    var compra  = document.getElementById('spanPrecioCompraPub').innerHTML.replace('S/. ', '');
    var venta  = document.getElementById('spanPrecioVentaPub').innerHTML.replace('S/. ', '');

    if( this.list_value == undefined ||  this.list_value == ""){
      this.alertsService.ErrorAlert("¡Error! Al Cambiar", "Debe Seleccionar una Cuenta de Recepción");
    
    }else if(parseFloat(campoArriba.value) > parseFloat(campoAbajo.value) &&  this.list_value.type_money_account == "DOLARES"){
      this.alertsService.ErrorAlert("¡Error! de Cuenta Bancaria", "El Tipo de Moneda que va a Recibir es Diferente al Tipo de Cuenta, Ambos deben ser Iguales.");
    
    }else if(parseFloat(campoArriba.value) < parseFloat(campoAbajo.value) &&  this.list_value.type_money_account == "SOLES"){
      this.alertsService.ErrorAlert("¡Error! de Cuenta Bancaria", "El Tipo de Moneda que va a Recibir es Diferente al Tipo de Cuenta, Ambos deben ser Iguales.");
    
    }else{
      this.ChangeCashPage(campoArriba,campoAbajo,compra,venta);
      this.list_value = undefined;
    }

  }


  async ChangeCashPage(campoArriba?, campoAbajo?,compra?,venta?){
    const modal = await this.modalCtrl.create({ 
      component: ChangeCashPage,
      componentProps:{
        campoArriba: campoArriba.value,
        campoAbajo: campoAbajo.value,
        list_concat: this.list_value.bank_account +'-'+this.list_value.number_account_type,
        list : this.list_value,
        compra: compra,
        venta: venta
      }});
 
    await modal.present();
  }


}
