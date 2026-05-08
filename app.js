// Classe Carro (Superclasse)
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
}

// Subclasse CarroEletrico
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

// Subclasse CarroCombustao
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

// Lógica da aplicação
let carros = [];
let currentType = '';

function showForm(type) {
    currentType = type;
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('extraFields').innerHTML = '';
    if (type === 'eletrico') {
        document.getElementById('extraFields').innerHTML = `
            <label for="bateria">Capacidade da Bateria (kWh):</label>
            <input type="number" id="bateria" required>
            <label for="autonomia">Autonomia (km):</label>
            <input type="number" id="autonomia" required>
        `;
    } else if (type === 'combustao') {
        document.getElementById('extraFields').innerHTML = `
            <label for="tipoCombustivel">Tipo de Combustível:</label>
            <input type="text" id="tipoCombustivel" required>
            <label for="consumo">Consumo (km/l):</label>
            <input type="number" id="consumo" required>
        `;
    }
}

function adicionarCarroEletrico() {
    showForm('eletrico');
}

function adicionarCarroCombustao() {
    showForm('combustao');
}

function cancelar() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('carroForm').reset();
}

document.getElementById('carroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const ano = parseInt(document.getElementById('ano').value);
    const precoCompra = parseFloat(document.getElementById('precoCompra').value);
    const precoVenda = parseFloat(document.getElementById('precoVenda').value);
    const fotoInput = document.getElementById('foto');
    let foto = '';

    if (fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            foto = event.target.result;
            criarCarro(modelo, marca, ano, precoCompra, precoVenda, foto);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        criarCarro(modelo, marca, ano, precoCompra, precoVenda, foto);
    }
});

function criarCarro(modelo, marca, ano, precoCompra, precoVenda, foto) {
    let carro;
    if (currentType === 'eletrico') {
        const bateria = parseFloat(document.getElementById('bateria').value);
        const autonomia = parseInt(document.getElementById('autonomia').value);
        carro = new CarroEletrico(modelo, marca, ano, precoCompra, precoVenda, bateria, autonomia, foto);
    } else if (currentType === 'combustao') {
        const tipoCombustivel = document.getElementById('tipoCombustivel').value;
        const consumo = parseFloat(document.getElementById('consumo').value);
        carro = new CarroCombustao(modelo, marca, ano, precoCompra, precoVenda, tipoCombustivel, consumo, foto);
    }

    carros.push(carro);
    document.getElementById('output').innerHTML = `${currentType === 'eletrico' ? 'Carro elétrico' : 'Carro de combustão'} adicionado com sucesso!`;
    cancelar();
}

function listarCarros() {
    if (carros.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum carro cadastrado.';
    } else {
        let list = '<h3>Lista de Carros:</h3><ul>';
        carros.forEach((carro, index) => {
            const fotoHtml = carro.getFoto() ? `<img src="${carro.getFoto()}" alt="Foto do carro" style="max-width: 100px; max-height: 100px;">` : '';
            list += `<li>${index}: ${carro.getInfo()} ${fotoHtml}</li>`;
        });
        list += '</ul>';
        document.getElementById('output').innerHTML = list;
    }
}

function venderCarro() {
    if (carros.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum carro cadastrado.';
        return;
    }
    listarCarros();
    const indice = parseInt(prompt('Digite o índice do carro a ser vendido:'));
    if (carros[indice]) {
        carros[indice].vender();
        document.getElementById('output').innerHTML = 'Carro vendido!';
    } else {
        document.getElementById('output').innerHTML = 'Índice inválido!';
    }
}

function depreciarCarro() {
    if (carros.length === 0) {
        document.getElementById('output').innerHTML = 'Nenhum carro cadastrado.';
        return;
    }
    listarCarros();
    const indice = parseInt(prompt('Digite o índice do carro a depreciar:'));
    if (carros[indice]) {
        carros[indice].depreciar();
        document.getElementById('output').innerHTML = 'Carro depreciado!';
    } else {
        document.getElementById('output').innerHTML = 'Índice inválido!';
    }
}