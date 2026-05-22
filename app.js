// Classes
class Carro {
    constructor(modelo, marca, ano, precoCompra, precoVenda, foto = '') {
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
        this.precoCompra = precoCompra;
        this.precoVenda = precoVenda;
        this.vendido = false;
        this.foto = foto;
    }

    vender() {
        this.vendido = true;
    }

    depreciar() {
        this.precoVenda *= 0.9;
    }

    lucro() {
        return this.precoVenda - this.precoCompra;
    }

    getInfo() {
        return `${this.marca} ${this.modelo} (${this.ano}) - R$ ${this.precoVenda.toFixed(2)}`;
    }

    getFoto() {
        return this.foto;
    }

    getPrecoVenda() {
        return this.precoVenda;
    }
}

class CarroEletrico extends Carro {
    constructor(modelo, marca, ano, precoCompra, precoVenda, bateria, autonomia, foto = '') {
        super(modelo, marca, ano, precoCompra, precoVenda, foto);
        this.bateria = bateria;
        this.autonomia = autonomia;
    }

    getInfo() {
        return `${super.getInfo()} - Elétrico (${this.bateria}kWh, ${this.autonomia}km autonomia)`;
    }
}

class CarroCombustao extends Carro {
    constructor(modelo, marca, ano, precoCompra, precoVenda, tipoCombustivel, consumo, foto = '') {
        super(modelo, marca, ano, precoCompra, precoVenda, foto);
        this.tipoCombustivel = tipoCombustivel;
        this.consumo = consumo;
    }

    getInfo() {
        return `${super.getInfo()} - ${this.tipoCombustivel} (${this.consumo}km/l)`;
    }
}

class Cliente {
    constructor(nome, endereco, telefone, email) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
    }

    getNome() {
        return this.nome;
    }

    getInfo() {
        return `${this.nome} - ${this.email}`;
    }
}

class ClientePF extends Cliente {
    constructor(nome, endereco, telefone, email, cpf, dataNascimento) {
        super(nome, endereco, telefone, email);
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    getInfo() {
        return `PF - ${this.nome} (CPF: ${this.cpf}) - ${this.email}`;
    }
}

class ClientePJ extends Cliente {
    constructor(nome, endereco, telefone, email, cnpj, nomeEmpresa, inscricaoEstadual) {
        super(nome, endereco, telefone, email);
        this.cnpj = cnpj;
        this.nomeEmpresa = nomeEmpresa;
        this.inscricaoEstadual = inscricaoEstadual;
    }

    getInfo() {
        return `PJ - ${this.nomeEmpresa} (CNPJ: ${this.cnpj}) - ${this.email}`;
    }
}

class Venda {
    constructor(carro, cliente, precoVenda, desconto = 0) {
        this.id = `VENDA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.carro = carro;
        this.cliente = cliente;
        this.dataVenda = new Date();
        this.precoVenda = precoVenda;
        this.desconto = desconto;
    }

    getPrecoFinal() {
        return this.precoVenda - this.desconto;
    }

    getInfo() {
        return `ID: ${this.id} | Carro: ${this.carro.getInfo()} | Cliente: ${this.cliente.getInfo()} | Preço Final: R$ ${this.getPrecoFinal().toFixed(2)}`;
    }
}

// Dados da aplicação
let carros = [];
let carrosVendidos = [];
let clientes = [];
let vendas = [];
let currentForm = '';

// Funções de Menu
function mostrarMenuCarros() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('menu').innerHTML = `
        <button onclick="mostrarFormCarro('eletrico')">Adicionar Carro Elétrico</button>
        <button onclick="mostrarFormCarro('combustao')">Adicionar Carro de Combustão</button>
        <button onclick="listarCarros()">Listar Carros</button>
        <button onclick="listarCarrosVendidos()">Carros Vendidos</button>
        <button onclick="depreciarCarro()">Depreciar Carro</button>
        <button onclick="voltarMenuPrincipal()">Voltar</button>
    `;
}

function mostrarMenuClientes() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('menu').innerHTML = `
        <button onclick="mostrarFormCliente('pf')">Adicionar Cliente PF</button>
        <button onclick="mostrarFormCliente('pj')">Adicionar Cliente PJ</button>
        <button onclick="listarClientes()">Listar Clientes</button>
        <button onclick="voltarMenuPrincipal()">Voltar</button>
    `;
}

function voltarMenuPrincipal() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('menu').innerHTML = `
        <button onclick="mostrarMenuCarros()">Gerenciar Carros</button>
        <button onclick="mostrarMenuClientes()">Gerenciar Clientes</button>
        <button onclick="mostrarFormVenda()">Realizar Venda</button>
        <button onclick="listarVendas()">Listar Vendas</button>
    `;
    document.getElementById('output').innerHTML = '';
}

// Funções de Formulário
function mostrarFormCarro(tipo) {
    currentForm = tipo;
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('extraFields').innerHTML = '';
    let html = `
        <label for="modelo">Modelo:</label>
        <input type="text" id="modelo" required>
        <label for="marca">Marca:</label>
        <input type="text" id="marca" required>
        <label for="ano">Ano:</label>
        <input type="number" id="ano" required>
        <label for="precoCompra">Preço de Compra:</label>
        <input type="number" id="precoCompra" required>
        <label for="precoVenda">Preço de Venda:</label>
        <input type="number" id="precoVenda" required>
        <label for="foto">Foto do Carro (URL):</label>
        <input type="text" id="foto">
    `;

    if (tipo === 'eletrico') {
        html += `
            <label for="bateria">Capacidade da Bateria (kWh):</label>
            <input type="number" id="bateria" required>
            <label for="autonomia">Autonomia (km):</label>
            <input type="number" id="autonomia" required>
        `;
    } else {
        html += `
            <label for="tipoCombustivel">Tipo de Combustível:</label>
            <input type="text" id="tipoCombustivel" required>
            <label for="consumo">Consumo (km/l):</label>
            <input type="number" id="consumo" required>
        `;
    }

    html += `
        <button type="button" onclick="adicionarCarro()">Adicionar</button>
        <button type="button" onclick="cancelarForm()">Cancelar</button>
    `;

    document.getElementById('extraFields').innerHTML = html;
}

function mostrarFormCliente(tipo) {
    currentForm = tipo;
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('extraFields').innerHTML = '';
    let html = `
        <label for="nome">Nome:</label>
        <input type="text" id="nome" required>
        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" required>
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" required>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
    `;

    if (tipo === 'pf') {
        html += `
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" required>
            <label for="dataNascimento">Data de Nascimento:</label>
            <input type="text" id="dataNascimento" placeholder="DD/MM/YYYY" required>
        `;
    } else {
        html += `
            <label for="cnpj">CNPJ:</label>
            <input type="text" id="cnpj" required>
            <label for="nomeEmpresa">Nome da Empresa:</label>
            <input type="text" id="nomeEmpresa" required>
            <label for="inscricaoEstadual">Inscrição Estadual:</label>
            <input type="text" id="inscricaoEstadual" required>
        `;
    }

    html += `
        <button type="button" onclick="adicionarCliente()">Adicionar</button>
        <button type="button" onclick="cancelarForm()">Cancelar</button>
    `;

    document.getElementById('extraFields').innerHTML = html;
}

function mostrarFormVenda() {
    if (carros.length === 0 || clientes.length === 0) {
        document.getElementById('output').innerHTML = 'Cadastre carros e clientes primeiro!';
        return;
    }

    currentForm = 'venda';
    document.getElementById('formContainer').style.display = 'block';

    let carroOptions = '<select id="selectCarro" required>';
    carros.forEach((carro, index) => {
        carroOptions += `<option value="${index}">${index}: ${carro.getInfo()}</option>`;
    });
    carroOptions += '</select>';

    let clienteOptions = '<select id="selectCliente" required>';
    clientes.forEach((cliente, index) => {
        clienteOptions += `<option value="${index}">${index}: ${cliente.getInfo()}</option>`;
    });
    clienteOptions += '</select>';

    let html = `
        <label for="selectCarro">Selecione o Carro:</label>
        ${carroOptions}
        <label for="selectCliente">Selecione o Cliente:</label>
        ${clienteOptions}
        <label for="desconto">Desconto (R$):</label>
        <input type="number" id="desconto" value="0" required>
        <button type="button" onclick="realizarVenda()">Realizar Venda</button>
        <button type="button" onclick="cancelarForm()">Cancelar</button>
    `;

    document.getElementById('extraFields').innerHTML = html;
}

// Funções de Ação
function adicionarCarro() {
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const ano = parseInt(document.getElementById('ano').value);
    const precoCompra = parseFloat(document.getElementById('precoCompra').value);
    const precoVenda = parseFloat(document.getElementById('precoVenda').value);
    const foto = document.getElementById('foto').value;

    let carro;
    if (currentForm === 'eletrico') {
        const bateria = parseFloat(document.getElementById('bateria').value);
        const autonomia = parseInt(document.getElementById('autonomia').value);
        carro = new CarroEletrico(modelo, marca, ano, precoCompra, precoVenda, bateria, autonomia, foto);
    } else {
        const tipoCombustivel = document.getElementById('tipoCombustivel').value;
        const consumo = parseFloat(document.getElementById('consumo').value);
        carro = new CarroCombustao(modelo, marca, ano, precoCompra, precoVenda, tipoCombustivel, consumo, foto);
    }

    carros.push(carro);
    document.getElementById('output').innerHTML = `${currentForm === 'eletrico' ? 'Carro elétrico' : 'Carro de combustão'} adicionado com sucesso!`;
    cancelarForm();
}

function adicionarCliente() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    let cliente;
    if (currentForm === 'pf') {
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        cliente = new ClientePF(nome, endereco, telefone, email, cpf, dataNascimento);
    } else {
        const cnpj = document.getElementById('cnpj').value;
        const nomeEmpresa = document.getElementById('nomeEmpresa').value;
        const inscricaoEstadual = document.getElementById('inscricaoEstadual').value;
        cliente = new ClientePJ(nome, endereco, telefone, email, cnpj, nomeEmpresa, inscricaoEstadual);
    }

    clientes.push(cliente);
    document.getElementById('output').innerHTML = `Cliente ${currentForm === 'pf' ? 'PF' : 'PJ'} adicionado com sucesso!`;
    cancelarForm();
}

function realizarVenda() {
    const indiceCarrow = parseInt(document.getElementById('selectCarro').value);
    const indiceCliente = parseInt(document.getElementById('selectCliente').value);
    const desconto = parseFloat(document.getElementById('desconto').value);

    const carroVendido = carros[indiceCarrow];
    const venda = new Venda(carroVendido, clientes[indiceCliente], carroVendido.getPrecoVenda(), desconto);
    
    vendas.push(venda);
    carroVendido.vender();
    carrosVendidos.push(carroVendido);
    
    // Remove o carro da lista de disponíveis
    carros.splice(indiceCarrow, 1);

    document.getElementById('output').innerHTML = `Venda realizada com sucesso!<br>${venda.getInfo()}<br><p style="color: green;">Carro removido da lista de disponíveis.</p>`;
    cancelarForm();
}

function listarCarros() {
    if (carros.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum carro cadastrado.';
        return;
    }

    let html = '<h3>Lista de Carros:</h3><table border="1" style="width:100%; border-collapse: collapse;"><tr><th>Índice</th><th>Informações</th><th>Foto</th></tr>';
    carros.forEach((carro, index) => {
        const fotoHtml = carro.getFoto() ? `<img src="${carro.getFoto()}" alt="Foto" style="max-width: 100px; max-height: 100px;">` : 'Sem foto';
        html += `<tr><td>${index}</td><td>${carro.getInfo()}</td><td>${fotoHtml}</td></tr>`;
    });
    html += '</table>';

    document.getElementById('output').innerHTML = html;
}

function listarClientes() {
    if (clientes.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum cliente cadastrado.';
        return;
    }

    let html = '<h3>Lista de Clientes:</h3><ul>';
    clientes.forEach((cliente, index) => {
        html += `<li>${index}: ${cliente.getInfo()}</li>`;
    });
    html += '</ul>';

    document.getElementById('output').innerHTML = html;
}

function listarCarrosVendidos() {
    if (carrosVendidos.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum carro vendido ainda.';
        return;
    }

    let html = '<h3>Carros Vendidos:</h3><table border="1" style="width:100%; border-collapse: collapse;"><tr><th>Índice</th><th>Informações</th><th>Foto</th></tr>';
    carrosVendidos.forEach((carro, index) => {
        const fotoHtml = carro.getFoto() ? `<img src="${carro.getFoto()}" alt="Foto" style="max-width: 100px; max-height: 100px;">` : 'Sem foto';
        html += `<tr><td>${index}</td><td>${carro.getInfo()}</td><td>${fotoHtml}</td></tr>`;
    });
    html += '</table>';

    document.getElementById('output').innerHTML = html;
}

function listarVendas() {
    if (vendas.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhuma venda realizada.';
        return;
    }

    let html = '<h3>Lista de Vendas:</h3><ul>';
    vendas.forEach((venda) => {
        html += `<li>${venda.getInfo()}</li>`;
    });
    html += '</ul>';

    document.getElementById('output').innerHTML = html;
}

function venderCarro() {
    listarCarros();
    const indice = prompt('Digite o índice do carro a ser vendido:');
    if (indice !== null && carros[indice]) {
        carros[indice].vender();
        document.getElementById('output').innerHTML += '<p style="color: green;">Carro marcado como vendido!</p>';
    } else if (indice !== null) {
        document.getElementById('output').innerHTML += '<p style="color: red;">Índice inválido!</p>';
    }
}

function depreciarCarro() {
    listarCarros();
    const indice = prompt('Digite o índice do carro a depreciar:');
    if (indice !== null && carros[indice]) {
        carros[indice].depreciar();
        document.getElementById('output').innerHTML += '<p style="color: green;">Carro depreciado com sucesso!</p>';
    } else if (indice !== null) {
        document.getElementById('output').innerHTML += '<p style="color: red;">Índice inválido!</p>';
    }
}

function cancelarForm() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('extraFields').innerHTML = '';
}