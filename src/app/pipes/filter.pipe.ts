import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(arreglo: any[], text: string): any[] {

    if(!text) return arreglo;
    
    text = text.toLowerCase();

    return arreglo.filter( item=>{
      return item.bank_account.toLowerCase().includes( text ) || item.type_name_account.toLowerCase().includes( text ) 
             || item.type_money_account.toLowerCase().includes( text ) || item.number_account_type.includes( text ) || item.name_account.includes( text );
    });

  }

}
