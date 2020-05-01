import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.page.html',
  styleUrls: ['./account-profile.page.scss'],
})
export class AccountProfilePage implements OnInit {

  usuario: Usuario = {};
  public formEdit : FormGroup;
  public disableButton: boolean = false;
  typedocument = [];

  constructor(public formBuilder: FormBuilder,private userService: UserService, public alertsService: AlertsService) {
    this.typedocument = ["CE","CR", "DNI", "PASSPORT", "PTP"];

   }

  ngOnInit() {
    this.usuario = this.userService.getUsuario();
    this.formEdit = this.updateForm();
  }

  public updateForm(){
   
    return this.formBuilder.group({
      typedocument:[this.usuario['typedocument']],
      numberdocument: [this.usuario['numberdocument'],Validators.pattern ("^[0-9]+$")],
      firstname: [this.usuario['firstname'],Validators.pattern("[a-zA-Z ]*")],
      lastname: [this.usuario['lastname'],Validators.pattern("[a-zA-Z ]*")],
      fathername: [this.usuario['fathername'],Validators.pattern("[a-zA-Z ]*")],
      mothername: [this.usuario['mothername'],Validators.pattern("[a-zA-Z ]*")],
      userdate: [this.usuario['userdate']],
      email : [{value:this.usuario['email'],disabled: true}]
    });

  }


  public errorMessages = {
    numberdocument: [
      { type: 'pattern', message: 'Solo caracteres numericos' }
    ],
    firstname: [
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ],
    lastname: [
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ],
    fathername: [
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ],
    mothername: [
      { type: 'pattern', message: 'Solo caracteres alfanuméricos' }
    ]
  }

  async userProfile(){

    this.disableButton = true;

    const data = this.formEdit.value;

    await this.alertsService.present();

    const valid = await this.userService.userUpdate( data );

    await this.alertsService.dismiss();

    if( valid ){
      this.alertsService.SuccessAlert("¡Felicidades!", "Cuenta Actualizada Correctamente", 'Actualizando...'); 
    }else{
      this.alertsService.ErrorAlert("¡Error! Al Actualizar Perfil", "Verifigue Nuevamente los Campos");
    }

    this.disableButton = false; 

  }

  dismissModal(){
    this.alertsService.dissModal();
  }

}
