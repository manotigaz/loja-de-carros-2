import promptSync from "prompt-sync";
import { Carro } from "./classes/Carro";
import { CarroEletrico } from "./classes/CarroEletrico";
import { CarroCombustao } from "./classes/CarroCombustao";
import { Cliente } from "./classes/Cliente";
import { ClientePF } from "./classes/ClientePF";
import { ClientePJ } from "./classes/ClientePJ";
import { Venda } from "./classes/Venda";

const teclado = promptSync();

let carros: Carro[] = [];
let carrosVendidos: Carro[] = [];
let clientes: Cliente[] = [];
let vendas: Venda[] = [];
let exec = true;

function menuPrincipal() {
  console.log("\n==============================");
  console.log("===== LOJA DE CARROS =====");
  console.log("1 - Gerenciar Carros");
  console.log("2 - Gerenciar Clientes");
  console.log("3 - Realizar Venda");
  console.log("4 - Listar Vendas");
  console.log("99 - Sair");
  console.log("==============================\n");
}

function executarComTratamento(acao: () => void) {
  try {
    acao();
  } catch (erro) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.log("Erro:", mensagem);
  }
}

function menuCarros() {
  let execCarros = true;
  while (execCarros) {
    console.log("\n===== GERENCIAR CARROS =====");
    console.log("1 - Adicionar carro elétrico");
    console.log("2 - Adicionar carro de combustão");
    console.log("3 - Listar carros");
    console.log("4 - Listar carros vendidos");
    console.log("5 - Depreciar carro");
    console.log("6 - Inspecionar todos os carros");
    console.log("0 - Voltar");
    console.log("==============================");

    const escolha = +teclado("Escolha uma opção: ");

    try {
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
        if (carrosVendidos.length === 0) {
          console.log("Nenhum carro vendido ainda.");
        } else {
          console.log("\n===== CARROS VENDIDOS =====");
          carrosVendidos.forEach((carro, index) => {
            console.log(`${index}: ${carro.getInfo()}`);
          });
        }
        break;

      case 5:
        if (carros.length === 0) {
          console.log("Nenhum carro cadastrado.");
        } else {
          carros.forEach((carro, index) => {
            console.log(`${index}: ${carro.getInfo()}`);
          });
          const indice = +teclado("Digite o índice do carro a depreciar: ");

            if (!Number.isInteger(indice) || indice < 0 || indice >= carros.length) {
              throw new Error("Índice inválido!");
            }
            const carroSelecionado = carros[indice];
            if (!carroSelecionado) {
              throw new Error("Carro não encontrado.");
            }
            carroSelecionado.depreciar();
            console.log("Carro depreciado com sucesso!");
        }
        break;

        case 6:
          if (carros.length === 0) {
            console.log("Nenhum carro cadastrado.");
          } else {
            console.log("\n===== INSPEÇÃO EM MASSA =====");
            carros.forEach((carro, index) => {
              console.log(`${index}: ${carro.getInfo()}`);
            });
            console.log("Inspeção em massa concluída.");
          }
          break;

      case 0:
        execCarros = false;
        break;

      default:
        console.log("Opção inválida!");
        break;
      }
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : String(erro);
      console.log("Erro:", mensagem);
    }
  }
}

function menuClientes() {
  let execClientes = true;
  while (execClientes) {
    console.log("\n===== GERENCIAR CLIENTES =====");
    console.log("1 - Adicionar cliente PF");
    console.log("2 - Adicionar cliente PJ");
    console.log("3 - Listar clientes");
    console.log("0 - Voltar");
    console.log("==============================");

    const escolha = +teclado("Escolha uma opção: ");

    switch (escolha) {
      case 1:
        const nomePF = teclado("Digite o nome do cliente: ");
        const enderecoPF = teclado("Digite o endereço: ");
        const telefonePF = teclado("Digite o telefone: ");
        const emailPF = teclado("Digite o email: ");
        const cpf = teclado("Digite o CPF: ");
        const dataNascimento = teclado("Digite a data de nascimento (DD/MM/YYYY): ");

        const clientePF = new ClientePF(
          nomePF,
          enderecoPF,
          telefonePF,
          emailPF,
          cpf,
          dataNascimento
        );

        clientes.push(clientePF);
        console.log("Cliente PF adicionado com sucesso!");
        break;

      case 2:
        const nomePJ = teclado("Digite o nome do responsável: ");
        const enderecoPJ = teclado("Digite o endereço: ");
        const telefonePJ = teclado("Digite o telefone: ");
        const emailPJ = teclado("Digite o email: ");
        const cnpj = teclado("Digite o CNPJ: ");
        const nomeEmpresa = teclado("Digite o nome da empresa: ");
        const inscricaoEstadual = teclado("Digite a inscrição estadual: ");

        const clientePJ = new ClientePJ(
          nomePJ,
          enderecoPJ,
          telefonePJ,
          emailPJ,
          cnpj,
          nomeEmpresa,
          inscricaoEstadual
        );

        clientes.push(clientePJ);
        console.log("Cliente PJ adicionado com sucesso!");
        break;

      case 3:
        if (clientes.length === 0) {
          console.log("Nenhum cliente cadastrado.");
        } else {
          clientes.forEach((cliente, index) => {
            console.log(`${index}: ${cliente.getInfo()}`);
          });
        }
        break;

      case 0:
        execClientes = false;
        break;

      default:
        console.log("Opção inválida!");
        break;
    }
  }
}

function realizarVenda() {
  if (carros.length === 0) {
    console.log("Nenhum carro cadastrado.");
    return;
  }

  if (clientes.length === 0) {
    console.log("Nenhum cliente cadastrado.");
    return;
  }

  console.log("\n===== CARROS DISPONÍVEIS =====");
  carros.forEach((carro, index) => {
    console.log(`${index}: ${carro.getInfo()}`);
  });
  try {
    const indiceCarrow = +teclado("Escolha o índice do carro: ");

    if (!Number.isInteger(indiceCarrow) || indiceCarrow < 0 || indiceCarrow >= carros.length) {
      throw new Error("Índice de carro inválido!");
    }

  console.log("\n===== CLIENTES =====");
  clientes.forEach((cliente, index) => {
    console.log(`${index}: ${cliente.getInfo()}`);
  });
    const indiceCliente = +teclado("Escolha o índice do cliente: ");

    if (!Number.isInteger(indiceCliente) || indiceCliente < 0 || indiceCliente >= clientes.length) {
      throw new Error("Índice de cliente inválido!");
    }

    const desconto = +teclado("Digite o desconto (R$): ");
    if (isNaN(desconto) || desconto < 0) {
      throw new Error("Desconto inválido!");
    }

    const carroVendido = carros[indiceCarrow];
    if (!carroVendido) {
      throw new Error("Carro não encontrado.");
    }
    const clienteSelecionado = clientes[indiceCliente];
    if (!clienteSelecionado) {
      throw new Error("Cliente não encontrado.");
    }
    if (desconto >= carroVendido.getPrecoVenda()) {
      throw new Error("Desconto muito alto para este carro.");
    }
  
  const venda = new Venda(
    carroVendido,
    clienteSelecionado,
    carroVendido.getPrecoVenda(),
    desconto
  );

  vendas.push(venda);
  carroVendido.vender();
  carrosVendidos.push(carroVendido);
  
  // Remove o carro da lista de disponíveis
  carros.splice(indiceCarrow, 1);
  
  console.log("Venda realizada com sucesso!");
  console.log(venda.getInfo());
  console.log("Carro removido da lista de disponíveis.");
  } catch (erro) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.log("Erro ao realizar venda:", mensagem);
  }
}

function listarVendas() {
  if (vendas.length === 0) {
    console.log("Nenhuma venda realizada.");
  } else {
    vendas.forEach((venda) => {
      console.log(venda.getInfo());
      console.log("---");
    });
  }
}

while (exec) {
  menuPrincipal();
  const escolha = +teclado("Escolha uma opção: ");

  switch (escolha) {
    case 1:
      menuCarros();
      break;

    case 2:
      menuClientes();
      break;

    case 3:
      realizarVenda();
      break;

    case 4:
      listarVendas();
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
