import { Component} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.page.html',
  styleUrls: ['./account-add.page.scss'],
})
export class AccountAddPage {

  public todo : FormGroup;
  public disableButton: any;
  public responseData: any;

  constructor(public http: HttpClient, public formBuilder: FormBuilder, public alertsService: AlertsService,public accountService: AccountService) {
      this.todo = this.formBuilder.group({
      name_account: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      doc_account: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(11),Validators.pattern ("^[0-9]+$")]],
      bank_account: ['', [Validators.required]],
      type_name_account: ['', [Validators.required]],
      number_account_type: ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
      type_money_account: ['', [Validators.required]]
    });

   }
   
   public errorMessages = {
    name_account: [
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ],
    doc_account: [
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 8' }
    ],
    number_account_type:[
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' }
    ]
  }

  async account(){

    this.disableButton = true; 

    await this.alertsService.present();

    const data = this.todo.value;

    const valid = await this.accountService.addAccount( data );

    await this.alertsService.dismiss();

      if( valid ){
          this.alertsService.SuccessAlert("¡Felicidades!", "Cuenta Agregada Correctamente", 'Actualizando...');
        }else{
          this.alertsService.ErrorAlert("¡Error! Al Agregar Cuenta", "Verifigue Nuevamente los Campos");
        }

    this.disableButton = false;

  }

 async dismissModal(){
    await this.alertsService.dissModal();
  }

}
