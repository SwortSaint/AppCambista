import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchTransaction'
})
export class FilterSearchTransactionPipe implements PipeTransform {

  transform(arreglo: any[], text: string): any[] {

    if(!text) return arreglo;
    
    text = text.toLowerCase();

    return arreglo.filter( item=>{
      return item.id_transaccion.includes( text ) || item.user_account_reception.toLowerCase().includes( text ) 
             || item.number_operation.toLowerCase().includes( text ) || item.cash_up.includes( text ) || item.cash_down.includes( text );
    });

  }

}
