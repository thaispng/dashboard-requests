export type Produto = {
    nome: string;
    valor: number;
  };
  
  export type Cliente = {
    nome: string;
    email: string;
    cpf: string;
  };
  
  export type Order = {
    id: number;
    data: string;
    valorTotal: number;
    produtos: Produto[];
    cliente: Cliente;
    status: string;
  };