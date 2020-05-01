import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountUserRegisterPage } from '../modals/account-user-register/account-user-register.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
@ViewChild('passwordEyeRegister', { read: ElementRef, static: false}) public passwordEye: ElementRef;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  disableButton: any;
  booleanpass: boolean = false;
  formlogin : FormGroup;

  constructor(public modalCtrl: ModalController ,private menuCtrl: MenuController,public formBuilder: FormBuilder, public userService: UserService, public natCtrl: NavController, public alertsService: AlertsService) { 
    this.formlogin = this.formBuilder.group({
          email: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
          password: ['', [Validators.required]]
    });
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese correo válido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' }
    ]
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  toggleSendwordMode(event){
    if(event !== ''){
      this.booleanpass = true;
    }else{
      this.booleanpass = false;
    }
  }

  
  togglePasswordMode() {   
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off'; 

    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
        //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
        //ejecuto el focus al input
    nativeEl.focus();
       //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
            nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
 }


  async login(){

    this.disableButton = true; 

    await this.alertsService.present();

    const valid = await this.userService.login( this.formlogin.controls['email'].value, this.formlogin.controls['password'].value);

    await this.alertsService.dismiss();
    
      if( valid ){
      await this.alertsService.presentLoadingLogin('Bienvenido...').then(() => 
      this.natCtrl.navigateRoot( '/inicio', { animated: true } ));
      this.menuCtrl.enable(true);

      }else{
        this.alertsService.ErrorAlert("!Error! Al Iniciar Sesión", "Usuario y/o Contraseña no Válidos");

      }

      this.disableButton = false;
  }

  async addModal(){

    const modal = await this.modalCtrl.create({ component: AccountUserRegisterPage });
    await modal.present();
 
   }


}
