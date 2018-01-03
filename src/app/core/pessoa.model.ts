export class Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento: string;
}

export class Pessoa {
    codigo: number;
    nome: string;
    ativo: true;
    endereco = new Endereco();
}
