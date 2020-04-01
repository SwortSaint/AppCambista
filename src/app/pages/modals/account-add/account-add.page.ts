import { Component} from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

const URL = environment.url;
const URLroute = environment.urlrouteaccount;

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.page.html',
  styleUrls: ['./account-add.page.scss'],
})
export class AccountAddPage {

  public todo : FormGroup;
  public disableButton: any;
  public responseData: any;

  constructor(public http: HttpClient, public formBuilder: FormBuilder, public alertsService: AlertsService) {
      this.todo = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      doc: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(11),Validators.pattern ("^[0-9]+$")]],
      bank: ['', [Validators.required]],
      type_number_bank: ['', [Validators.required]],
      number_bank: ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
      type_money: ['', [Validators.required]]
    });

   }
   
   public errorMessages = {
    name: [
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ],
    doc: [
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 8' }
    ],
    number_bank:[
      { type: 'required', message: 'Campo es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' }
    ]
  }

 async account(){

    this.disableButton = true; 

    let account = { 
      "id" : 40,
      "account_name" : this.todo.controls['name'].value , 
      "account_doc"  : this.todo.controls['doc'].value, 
      "account_bank" : this.todo.controls['bank'].value,
      "account_type_number_bank" : this.todo.controls['type_number_bank'].value,
      "account_number_bank" : this.todo.controls['number_bank'].value,
      "account_type_money" : this.todo.controls['type_money'].value,
      "setting": "account"
    };

      await this.alertsService.showLoader();

      this.http.post(URL+URLroute, JSON.stringify(account)).pipe(
        finalize(async () => {
            await this.alertsService.hideLoader();
            this.disableButton = false;  
        })
    )
    .subscribe(data => {

              this.responseData = data;

              if(this.responseData.error){
                    this.alertsService.ErrorAlert("¡Error! Al Agregar Cuenta", "Rellene Nuevamente los Campos");
              }else{
                    this.alertsService.SuccessAlert("¡Felicidades!", "Cuenta Agregada Correctamente");
              }
        },(err) => {
                    this.alertsService.ErrorAlert("¡Error!", "Compruebe su Conexión de Internet"); 
        });

      }

 async dismissModal(){
    await this.alertsService.dissModal();
  }

}
