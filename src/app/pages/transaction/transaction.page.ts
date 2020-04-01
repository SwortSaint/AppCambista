import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonSegment } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  @ViewChild( IonSegment, null ) segment: IonSegment;

  public items: any[] = [];
  public publisher= '';
  public contentloaded = false;
  public textSearch = '';
  public searching: any = false;

  constructor(public dataService: DataService, public alertsService: AlertsService, ) { }

  ngOnInit() {
    this.segment.value = 'todos';
    this.setFilteredItems();

    setTimeout(() => {
      this.contentloaded = true;
    }, 1200);
  }

  onSearchInput( event ){
    this.searching = true;

    setTimeout(()=>{  
      
      this.searching = false;
      this.textSearch = event.detail.value;

      }, 500);
  }

  setFilteredItems() {
    this.dataService.getTransaction().subscribe( items =>{ this.items = items;});
  }

  segmentChanged(event){
    const valueSegmento = event.detail.value;

    if( valueSegmento === 'todos'){
      this.publisher = '';
      return;
    }

    this.publisher = valueSegmento;
  }

  async delTransaction(list){

    let params = {
      "id_transaccion": list.id_transaccion,
      "setting": "delete"
    }

    await this.alertsService.presentAlertConfirm(list, this.items,environment.messageSuccess,
      environment.messageSuccessTransaction,
      environment.messageErrorTransactionHeader,
      environment.messageErrorTransactionTitle,
      environment.messageErrorRedHeader,
      environment.messageErrorRedTitle,
      environment.urlroutetransaction,
      environment.messagePresentTransaction,
      params)
      }

}
