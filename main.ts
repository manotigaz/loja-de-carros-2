import promptSync from "prompt-sync";
import { Carro, CarroEletrico, CarroCombustao } from "./carro";

const teclado = promptSync();

let carros: Carro[] = [];
let exec = true;

while (exec) {
  console.log("\n===== LOJA DE CARROS =====");
  console.log("1 - Adicionar carro elétrico");
  console.log("2 - Adicionar carro de combustão");
  console.log("3 - Listar carros");
  console.log("4 - Vender carro");
  console.log("5 - dar desconto no carro");
  console.log("99 - Sair");
  console.log("\n==============================");

  const escolha = +teclado("Escolha uma opção: ");

  switch (escolha) {
    case 1:
      const modeloE = teclado("Digite o modelo do carro elétrico: ");
      const marcaE = teclado("Digite a marca do carro elétrico: ");
      const anoE = +teclado("Digite o ano do carro elétrico: ");
      const precoCompraE = +teclado("Preço de compra: ");
      const precoVendaE = +teclado("Preço de venda: ");
      const bateria = +teclado("Capacidade da bateria (kWh): ");
      const autonomia = +teclado("Autonomia (km): ");
      const fotoE = teclado("URL da foto (opcional): ");

      const carroEletrico = new CarroEletrico(
        modeloE,
        marcaE,
        anoE,
        precoCompraE,
        precoVendaE,
        bateria,
        autonomia,
        fotoE
      );

      carros.push(carroEletrico);
      console.log("Carro elétrico adicionado com sucesso!");
      break;

    case 2:
      const modeloC = teclado("Digite o modelo do carro de combustão: ");
      const marcaC = teclado("Digite a marca do carro de combustão: ");
      const anoC = +teclado("Digite o ano do carro de combustão: ");
      const precoCompraC = +teclado("Preço de compra: ");
      const precoVendaC = +teclado("Preço de venda: ");
      const tipoCombustivel = teclado("Tipo de combustível: ");
      const consumo = +teclado("Consumo (km/l): ");
      const fotoC = teclado("URL da foto (opcional): ");

      const carroCombustao = new CarroCombustao(
        modeloC,
        marcaC,
        anoC,
        precoCompraC,
        precoVendaC,
        tipoCombustivel,
        consumo,
        fotoC
      );

      carros.push(carroCombustao);
      console.log("Carro de combustão adicionado com sucesso!");
      break;

    case 3:
      if (carros.length === 0) {
        console.log("Nenhum carro cadastrado.");
      } else {
        carros.forEach((carro, index) => {
          console.log(`${index}: ${carro.getInfo()}`);
        });
      }
      break;

    case 4:
      if (carros.length === 0) {
        console.log("Nenhum carro cadastrado.");
      } else {
        carros.forEach((carro, index) => {
          console.log(`${index}: ${carro.getInfo()}`);
        });
        const indice = +teclado("Digite o índice do carro a ser vendido: ");

        if (carros[indice]) {
          carros[indice].vender();
          console.log("Carro vendido!");
        } else {
          console.log("Índice inválido!");
        }
      }
      break;

    case 5:
      if (carros.length === 0) {
        console.log("Nenhum carro cadastrado.");
      } else {
        carros.forEach((carro, index) => {
          console.log(`${index}: ${carro.getInfo()}`);
        });
        const indice = +teclado("Digite o índice do carro para dar desconto: ");

        if (carros[indice]) {
          carros[indice].depreciar();
          console.log("desconto aplicado!");
        } else {
          console.log("Índice inválido!");
        }
      }
      break;

    case 99:
      exec = false;
      console.log("Até logo!");
      break;

    default:
      console.log("Opção inválida!");
      break;
  }
}