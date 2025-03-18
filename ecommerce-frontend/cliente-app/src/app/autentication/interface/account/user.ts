export interface Address {
    id?: number;
    street: string | null;
    number: string | null;
    neighborhood: string | null;
    state: string | null;
    city: string | null;
  }
  
  export interface Client {
    name: string;
    email: string;
    phone: string | null;
    address: Address | null;
    cpf: string | null;
  }
  