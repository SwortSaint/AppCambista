import { Component} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

const URL = environment.url;
const URLroute = "App-Account";

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


  constructor(public navParams:NavParams, public http: HttpClient, public formBuilder: FormBuilder, public alertsService: AlertsService) {
    this.list = this.navParams.get('list');
    this.todo = this.updateForm();
    this.typemoney = ["SOLES","DOLARES"];
    this.typenumberbank = ["CORRIENTE","AHORRO"];
    this.typebanks = ["BCP","BBVA","INTERBANK","SCOTIABANK","DLNACION","PICHINCHA","BANBIF","FALABELLA","AREQUIPA"];
   }

   public updateForm(){
   
    return this.formBuilder.group({
      name:[{value:this.list['name_account'],disabled: true}],
      doc: [{value:this.list['doc_account'],disabled: true}],
      bank: [{value:this.list['bank_account'],disabled: true}],
      type_number_bank: [this.list['type_name_account']],
      number_bank: [this.list['number_account_type'], [Validators.required,Validators.pattern("^[0-9]+$")]],
      type_money: [this.list['type_money_account']],
      id_account_user: this.list['id_account_user'],
      setting : "updaccount"
    });

  }

 async updateAccount(){
      this.disableButton = true; 
      this.todo.addControl('new', this.formBuilder.group({
      name: [this.todo.controls.name.value, Validators.required],
      doc: [this.todo.controls.doc.value, Validators.required],
      bank: [this.todo.controls.bank.value, Validators.required]
    }));

    const data = this.todo.value;

    await this.alertsService.showLoader();

    this.http.post(URL+URLroute, JSON.stringify(data)).pipe(
      finalize(async () => {
          await this.alertsService.hideLoader();
      })).subscribe(data => {

            this.responseData = data;

            if(this.responseData.error){
                  this.alertsService.ErrorAlert("¡Error! Al Editar Cuenta", "Verifigue Nuevamente los Campos");
                  this.disableButton = false;  
            }else{
                  this.alertsService.SuccessAlert("¡Felicidades!", "Cuenta Edita Correctamente");
                  this.disableButton = false;  
            }
      },(err) => {
                  this.alertsService.ErrorAlert("¡Error!", "Compruebe su Conexión de Internet");
                  this.disableButton = false;  
      });

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
