import { Carro } from './Carro';
import { Cliente } from './Cliente';

export class Venda {
  private id: string;
  private carro: Carro;
  private cliente: Cliente;
  private dataVenda: Date;
  private precoVenda: number;
  private desconto: number = 0;

  constructor(
    carro: Carro,
    cliente: Cliente,
    precoVenda: number,
    desconto: number = 0
  ) {
    this.id = this.gerarId();
    this.carro = carro;
    this.cliente = cliente;
    this.dataVenda = new Date();
    this.precoVenda = precoVenda;
    this.desconto = desconto;
  }

  private gerarId(): string {
    return `VENDA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getId(): string {
    return this.id;
  }

  getCarro(): Carro {
    return this.carro;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  getDataVenda(): Date {
    return this.dataVenda;
  }

  getPrecoVenda(): number {
    return this.precoVenda;
  }

  getDesconto(): number {
    return this.desconto;
  }

  getPrecoFinal(): number {
    return this.precoVenda - this.desconto;
  }

  getInfo(): string {
    return `
      ID: ${this.id}
      Carro: ${this.carro.getInfo()}
      Cliente: ${this.cliente.getInfo()}
      Data: ${this.dataVenda.toLocaleDateString('pt-BR')}
      Preço: R$ ${this.precoVenda.toFixed(2)}
      Desconto: R$ ${this.desconto.toFixed(2)}
      Preço Final: R$ ${this.getPrecoFinal().toFixed(2)}
    `;
  }
}
