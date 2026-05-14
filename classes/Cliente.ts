export abstract class Cliente {
  protected nome: string;
  protected endereco: string;
  protected telefone: string;
  protected email: string;

  constructor(
    nome: string,
    endereco: string,
    telefone: string,
    email: string
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
  }

  getNome(): string {
    return this.nome;
  }

  getEndereco(): string {
    return this.endereco;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getEmail(): string {
    return this.email;
  }

  abstract getInfo(): string;
}
