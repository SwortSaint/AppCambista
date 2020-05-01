import { Component} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavParams } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage {

  public todo : FormGroup;
  public list: any;
  public disableButton: any;
  public responseData: any;
  typemoney = [];
  typenumberbank = [];
  typebanks = [];


  constructor(public accountService: AccountService, public navParams:NavParams, public http: HttpClient, public formBuilder: FormBuilder, public alertsService: AlertsService) {
    this.list = this.navParams.get('list');
    this.todo = this.updateForm();
    this.typemoney = ["SOLES","DOLARES"];
    this.typenumberbank = ["CORRIENTE","AHORRO"];
    this.typebanks = ["BCP","BBVA","INTERBANK","SCOTIABANK","DLNACION","PICHINCHA","BANBIF","FALABELLA","AREQUIPA"];
   }

   public updateForm(){
   
    return this.formBuilder.group({
      _id: [this.list['_id']],
      name_account:[{value:this.list['name_account'],disabled: true}],
      doc_account: [{value:this.list['doc_account'],disabled: true}],
      bank_account: [{value:this.list['bank_account'],disabled: true}],
      type_name_account: [this.list['type_name_account']],
      number_account_type: [this.list['number_account_type'], [Validators.required,Validators.pattern("^[0-9]+$")]],
      type_money_account: [this.list['type_money_account']],
    });

  }

  async updateAccount(){

    this.disableButton = true; 

    await this.alertsService.present();

    const data = this.todo.value;

    const valid = await this.accountService.editAccount( data);

    await this.alertsService.dismiss();

      if( valid ){
          this.alertsService.SuccessAlert("¡Felicidades!", "Cuenta Editada Correctamente", 'Actualizando...');
        }else{
          this.alertsService.ErrorAlert("¡Error! Al Editar Cuenta", "Verifigue Nuevamente los Campos");
        }

    this.disableButton = false;

  }

  public errorMessages = {
    number_bank:[
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' }
    ]
  }
  
  dismissModal(){
    this.alertsService.dissModal();
  }

}
