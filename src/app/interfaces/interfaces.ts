export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
    color: string
  }

export interface Usuario{
    _id?: string;
    email?: string;
}

export interface RespuestaAccount{
  ok: boolean;
  account: Account[];
}

export interface Account{
  _id?: string;
  name_account?: string;
  doc_account?: string;
  bank_account?: string;
  type_name_account?: string;
  number_account_type?: string;
  usuario?: Usuario;
  type_money_account?: string;
  created?: string;
  
}

export interface RespuestaTransaction{
  ok: boolean;
  transaction: Transaction[];
}

export interface Transaction{
  _id?: string;
  usuario?: string;
  ip_reception?: string;
  created?: string;
  user_account_reception?: string;
  number_operation?: string;
  cash_up?: string;
  cash_down?: string;
  type_change?: string;
  status?: string;
  
}



  