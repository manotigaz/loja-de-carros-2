import { Carro } from './Carro';

export class CarroEletrico extends Carro {
  private bateria: number;
  private autonomia: number;

  constructor(
    modelo: string,
    marca: string,
    ano: number,
    precoCompra: number,
    precoVenda: number,
    bateria: number,
    autonomia: number,
    foto: string = ''
  ) {
    super(modelo, marca, ano, precoCompra, precoVenda, foto);
    this.bateria = bateria;
    this.autonomia = autonomia;
  }

  getBateria(): number {
    return this.bateria;
  }

  getAutonomia(): number {
    return this.autonomia;
  }

  getInfo(): string {
    return `${super.getInfo()} - Elétrico (${this.bateria}kWh, ${this.autonomia}km autonomia)`;
  }
}
