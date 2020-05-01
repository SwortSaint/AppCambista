import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-cash',
  templateUrl: './transaction-cash.page.html',
  styleUrls: ['./transaction-cash.page.scss'],
})
export class TransactionCashPage implements OnInit {

  private list: any;
  private campoArriba: any;
  private campoAbajo: any;
  private list_concat: any;
  private compra: any;
  private venta: any;
  private disableButton: any;
  private type_user_change : String;
  private moneda_up: String;
  private moneda_down: String;
  formulario : FormGroup;
  

  constructor(public alertsService: AlertsService, public navParams:NavParams,public formBuilder: FormBuilder,public transactionService: TransactionService) {
    this.list = this.navParams.get('list');
    this.compra = navParams.get('compra');
    this.venta = navParams.get('venta');
    this.campoArriba = navParams.get('campoArriba');
    this.campoAbajo = navParams.get('campoAbajo');
    this.list_concat = navParams.get('list_concat');

    this.formulario = this.formBuilder.group({
      number_operation: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern ("^[0-9]+$")]],
    });

   }

   public errorMessages = {
    number_operation: [
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 6' }
    ]
  }

  ngOnInit() {
  }

  dismissModal(){
    this.alertsService.dissModal();
  }

 async sendOperation(){

    this.disableButton = true; 

    await this.alertsService.present();

    if(parseFloat(this.campoArriba) > parseFloat(this.campoAbajo)){
      this.type_user_change = 'VENTA';
      this.moneda_up = "S/. "+this.campoArriba;
      this.moneda_down = "$ "+this.campoAbajo;
    }else{
      this.type_user_change = 'COMPRA';
      this.moneda_up = "$ "+this.campoArriba;
      this.moneda_down = "S/. "+this.campoAbajo;
    }

    const data = {user_account_reception: this.list_concat,
                  number_operation: this.formulario.controls['number_operation'].value,
                  cash_up: this.campoArriba,
                  cash_down: this.campoAbajo,
                  type_change: this.type_user_change,
                  price_comp: this.compra,
                  price_vent: this.venta,
                  status: 'PENDIENTE'}

    const valid = await this.transactionService.addTransaction( data );

    await this.alertsService.dismiss();

      if( valid ){
          await this.transactionService.SuccessAlertNotification(this.moneda_up, this.moneda_down);
        }else{
          await this.alertsService.ErrorAlert("¡Error! Al Enviar Operación", "Verifigue Nuevamente los Campos");
        }


   this.disableButton = false;

  }

}
