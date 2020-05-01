import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionCashPage } from '../transaction-cash/transaction-cash.page';

@Component({
  selector: 'app-change-cash',
  templateUrl: './change-cash.page.html',
  styleUrls: ['./change-cash.page.scss'],
})
export class ChangeCashPage implements OnInit {

  formulario : FormGroup;
  private list: any;
  private campoArriba: any;
  private campoAbajo: any;
  private list_concat: any;
  private rescal: any;
  private compra: any;
  private venta: any;
  private openvalue:any;
  //private typebanks: any;


  constructor(public alertController: AlertController,public modalCtrl: ModalController,public transactionService: TransactionService,public navParams:NavParams,public alertsService: AlertsService, public formBuilder: FormBuilder) { 
    this.list = this.navParams.get('list');
    this.compra = navParams.get('compra');
    this.venta = navParams.get('venta');
    this.campoArriba = navParams.get('campoArriba');
    this.campoAbajo = navParams.get('campoAbajo');
    this.list_concat = navParams.get('list_concat');

    //this.typebanks = ["BCP","BBVA","INTERBANK","SCOTIABANK","DLNACION","PICHINCHA","BANBIF","FALABELLA","AREQUIPA"];

    this.formulario = this.formBuilder.group({
      bank_account: ['',Validators.required,],
    });

  }

  ngOnInit() {
  }

  
  href(){
    
    if(parseFloat(this.campoArriba) > parseFloat(this.campoAbajo)){
      this.rescal = parseFloat(this.campoArriba) * this.compra;
      this.openvalue = 'https://api.whatsapp.com/send?phone=51970782603&text=Buen dia: Acabo de VENDER '+this.campoArriba+' dólares, este monto le enviaré por el banco: ' +this.formulario.controls['bank_account'].value+
      ' a su cuenta en dólares, envíeme su número de cuenta por favor. Por esta transacción recibiré '+this.rescal.toFixed(2)+' soles en mi cuenta en soles del banco: '+this.list_concat+', atentamente. Gracias'
    }else{
      this.rescal = parseFloat(this.campoArriba) * this.venta;
      this.openvalue = 'https://api.whatsapp.com/send?phone=51970782603&text=Buen dia: Acabo de COMPRAR '+this.campoArriba+' dólares, por lo tanto depositare '+this.rescal.toFixed(2)+' soles,  envíeme la cuenta en soles del  banco: '+this.formulario.controls['bank_account'].value+
      ' .Por esta transacción recibiré '+this.campoArriba+ ' dólares en mi cuenta en dólares del banco: '+this.list_concat+', atentamente. Gracias'

    }

    //const result = this.typebanks.filter(typebank => typebank == this.formulario.controls['bank_account'].value);
    window.open( this.openvalue , '_system');

  }

 async change_money(){

    await this.presentAlertConfirmChangeCash();

  }

  async dismissModal(){
    await this.alertsService.dissModal();
  }

  
  async presentAlertConfirmChangeCash() {

    const alert = await this.alertController.create({
      header: '¿Ha Realizado la Transacción al Banco Seleccionado?',
      message: 'Recuerde que debe Realizar la Transacción Antes de Seguir con la Operación',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si',
          handler: async () => {

            await this.changeCashModal();

          }
        }],
        backdropDismiss: false
    });

    await alert.present();
  }

  async changeCashModal(){

    const modal = await this.modalCtrl.create({ 
      component: TransactionCashPage,
      componentProps:{
        campoArriba: this.campoArriba,
        campoAbajo: this.campoAbajo,
        list_concat: this.list_concat,
        list : this.list,
        compra: this.compra,
        venta: this.venta
      }
    });
 
    return await modal.present();
 
   }


}
