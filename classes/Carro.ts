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

  getInfo(): string {
    return `${this.marca} ${this.modelo} (${this.ano}) - R$ ${this.precoVenda}`;
  }

  getFoto(): string {
    return this.foto;
  }

  getModelo(): string {
    return this.modelo;
  }

  getMarca(): string {
    return this.marca;
  }

  getAno(): number {
    return this.ano;
  }

  getPrecoVenda(): number {
    return this.precoVenda;
  }

  getPrecoCompra(): number {
    return this.precoCompra;
  }

  isVendido(): boolean {
    return this.vendido;
  }
}
