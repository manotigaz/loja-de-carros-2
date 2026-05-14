export class Carro {
  protected modelo: string;
  protected marca: string;
  protected ano: number;
  protected precoCompra: number;
  protected precoVenda: number;
  protected vendido: boolean = false;
  protected foto: string = '';

  constructor(
    modelo: string,
    marca: string,
    ano: number,
    precoCompra: number,
    precoVenda: number,
    foto: string = ''
  ) {
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
    this.precoCompra = precoCompra;
    this.precoVenda = precoVenda;
    this.foto = foto;
  }

  vender() {
    this.vendido = true;
  }

  depreciar() {
    this.precoVenda *= 0.9;
  }

  lucro(): number {
    return this.precoVenda - this.precoCompra;
  }

  // Método para obter informações básicas
  getInfo(): string {
    return `${this.marca} ${this.modelo} (${this.ano}) - R$ ${this.precoVenda}`;
  }
}

export class CarroEletrico extends Carro {
  private bateria: number; // em kWh
  private autonomia: number; // em km

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

  getInfo(): string {
    return `${super.getInfo()} - Elétrico (${this.bateria}kWh, ${this.autonomia}km autonomia)`;
  }
}

export class CarroCombustao extends Carro {
  private tipoCombustivel: string;
  private consumo: number; // km/l

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

  getInfo(): string {
    return `${super.getInfo()} - ${this.tipoCombustivel} (${this.consumo}km/l)`;
  }
}