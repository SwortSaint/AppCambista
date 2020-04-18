import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(public alertsService: AlertsService) { }

  ngOnInit() {
  }

  
  async dismissModal(){
    await this.alertsService.dissModal();
  }

}
