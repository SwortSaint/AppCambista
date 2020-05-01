import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { MenuController, NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account-user-register',
  templateUrl: './account-user-register.page.html',
  styleUrls: ['./account-user-register.page.scss'],
})
export class AccountUserRegisterPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef, static: false}) public passwordEye: ElementRef;

  public formRegister : FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public disableButton: any;
  public booleanpass: boolean = false;

  constructor(public modalCtrl: ModalController,public alertController: AlertController, public loadingController: LoadingController,public alertService: AlertsService,public natCtrl: NavController, private menuCtrl: MenuController,public userService: UserService,public http: HttpClient, public formBuilder: FormBuilder,public alertsService: AlertsService) {
    this.formRegister = this.formBuilder.group({
      type: ['', [Validators.required]],
      doc: ['', [Validators.required,Validators.pattern ("^[0-9]+$")]],
      email: ['', [Validators.required,Validators.pattern ("^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      tel: ['', [Validators.required,Validators.minLength(9),Validators.pattern ("^[0-9]+$")]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      re_password: ['', [Validators.required,Validators.minLength(8),this.equalto('password')]]
    });
   }

   equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
    }

  public errorMessages = {
    type: [
      { type: 'required', message: 'Tipo de Documento es requerido' }
    ],
    doc: [
      { type: 'required', message: 'N° de Cuenta es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' }
    ],
    email:[
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese correo válido' }
    ],tel: [
      { type: 'required', message: 'Celular es requerido' },
      { type: 'pattern', message: 'Solo caracteres numericos' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 9' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 8' }
    ], 
    re_password: [
      { type: 'required', message: 'Repetir Contraseña es requerida' },
      { type: 'minlength', message: 'MÍnimo de caracteres es 8' },
      { type: 'equalTo', message: 'Deben Coinicidir su clave de acceso' }
    ]
  }


  ngOnInit() {
  }

  async userRegister(){

    this.disableButton = true;

    await this.alertsService.present();

    const valid = await this.userService.userRegister( this.formRegister.controls['type'].value, 
                                                       this.formRegister.controls['doc'].value,
                                                       this.formRegister.controls['tel'].value,
                                                       this.formRegister.controls['email'].value,
                                                       this.formRegister.controls['password'].value);

    await this.alertsService.dismiss();

    if( valid ){

       this.SuccessAlertUserRegister("¡Felicidades!","Te has registrado exitosamente");
       this.menuCtrl.enable(true);
     
    }else{
        this.alertsService.ErrorAlert("!Error! Al Crear Usuario", "El Correo Electrónico ya existe");

    }

    this.disableButton = false; 

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Bienvenido...',
      duration: 1000
    });
    await loading.present();

    await loading.onDidDismiss().then((dis) => {
      this.modalCtrl.dismiss().then((dis) => {
        this.natCtrl.navigateRoot( '/inicio', { animated: true })
      });
    });
  }

  async SuccessAlertUserRegister(header: string, message: string) {

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          alert.dismiss().then(() => { this.presentLoading(); });
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
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


  dismissModal(){
    this.alertsService.dissModal();
  }


}
