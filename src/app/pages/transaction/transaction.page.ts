import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  @ViewChild( IonSegment, null ) segment: IonSegment;

  public publisher= '';
  public contentloaded = false;
  public textSearch = '';
  public searching: any = false;
  transaction: Transaction[] = [];

  constructor(public transactionService: TransactionService) { }

  ngOnInit() {
    this.segment.value = 'todos';
    this.setFilteredItems();

    setTimeout(() => {
      this.contentloaded = true;
    }, 1200);

    this.transactionService.getSocketCancelTransaction().subscribe( () =>{
      this.transaction = [];
      this.setFilteredItems();
    });
  }

  onSearchInput( event ){
    this.searching = true;

    setTimeout(()=>{  
      
      this.searching = false;
      this.textSearch = event.detail.value;

      }, 500);
  }

  setFilteredItems() {
    this.transactionService.getTransaction().subscribe( resp =>{ this.transaction.push(... resp.transaction)});
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


  await this.transactionService.presentAlertConfirm(list)
      }

}
