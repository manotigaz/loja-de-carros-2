import { Carro } from './Carro';

export class CarroCombustao extends Carro {
  private tipoCombustivel: string;
  private consumo: number;

  constructor(
    modelo: string,
    marca: string,
    ano: number,
    precoCompra: number,
    precoVenda: number,
    tipoCombustivel: string,
    consumo: number,
    foto: string = ''
  ) {
    super(modelo, marca, ano, precoCompra, precoVenda, foto);
    this.tipoCombustivel = tipoCombustivel;
    this.consumo = consumo;
  }

  getTipoCombustivel(): string {
    return this.tipoCombustivel;
  }

  getConsumo(): number {
    return this.consumo;
  }

  getInfo(): string {
    return `${super.getInfo()} - ${this.tipoCombustivel} (${this.consumo}km/l)`;
  }
}
