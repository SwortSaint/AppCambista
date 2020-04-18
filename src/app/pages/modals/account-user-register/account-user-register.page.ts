import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-account-user-register',
  templateUrl: './account-user-register.page.html',
  styleUrls: ['./account-user-register.page.scss'],
})
export class AccountUserRegisterPage implements OnInit {

  constructor(public alertsService: AlertsService) { }

  ngOnInit() {
  }

  dismissModal(){
    this.alertsService.dissModal();
  }

}
