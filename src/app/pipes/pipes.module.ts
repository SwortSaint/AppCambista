import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterTransactionPipe } from './filter-transaction.pipe';
import { FilterSearchTransactionPipe } from './filter-search-transaction.pipe';



@NgModule({
  declarations: [FilterPipe, FilterTransactionPipe, FilterSearchTransactionPipe],
  exports:[FilterPipe,FilterTransactionPipe,FilterSearchTransactionPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
