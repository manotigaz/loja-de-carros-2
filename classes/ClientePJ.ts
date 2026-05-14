import { Cliente } from './Cliente';

export class ClientePJ extends Cliente {
  private cnpj: string;
  private nomeEmpresa: string;
  private inscricaoEstadual: string;

  constructor(
    nome: string,
    endereco: string,
    telefone: string,
    email: string,
    cnpj: string,
    nomeEmpresa: string,
    inscricaoEstadual: string
  ) {
    super(nome, endereco, telefone, email);
    this.cnpj = cnpj;
    this.nomeEmpresa = nomeEmpresa;
    this.inscricaoEstadual = inscricaoEstadual;
  }

  getCnpj(): string {
    return this.cnpj;
  }

  getNomeEmpresa(): string {
    return this.nomeEmpresa;
  }

  getInscricaoEstadual(): string {
    return this.inscricaoEstadual;
  }

  getInfo(): string {
    return `PJ - ${this.nomeEmpresa} (CNPJ: ${this.cnpj}) - ${this.email}`;
  }
}
