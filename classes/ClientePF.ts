import { Cliente } from './Cliente';

export class ClientePF extends Cliente {
  private cpf: string;
  private dataNascimento: string;

  constructor(
    nome: string,
    endereco: string,
    telefone: string,
    email: string,
    cpf: string,
    dataNascimento: string
  ) {
    super(nome, endereco, telefone, email);
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  getCpf(): string {
    return this.cpf;
  }

  getDataNascimento(): string {
    return this.dataNascimento;
  }

  getInfo(): string {
    return `PF - ${this.nome} (CPF: ${this.cpf}) - ${this.email}`;
  }
}
