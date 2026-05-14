# PRÓXIMOS PASSOS - GIT

## 1. Verificar Status
```powershell
git status
```

## 2. Adicionar Arquivos
```powershell
git add .
```

## 3. Criar Commit
```powershell
git commit -m "Reorganizar projeto: classes separadas, clientes PF/PJ e vendas"
```

Ou commit mais detalhado:
```powershell
git commit -m "feat: reorganizar arquitetura do projeto

- Separar classes em arquivos individuais (classes/)
- Implementar hierarquia Carro -> CarroEletrico/CarroCombustao
- Implementar hierarquia Cliente -> ClientePF/ClientePJ
- Criar classe Venda com lógica completa
- Atualizar main.ts com menu de clientes e vendas
- Atualizar app.js para versão web com todas funcionalidades
- Melhorar interface web com CSS responsivo
- Adicionar documentação completa (README.md)"
```

## 4. Enviar para GitHub
```powershell
git push origin main
```

## 5. Verificar no GitHub
Acesse: https://github.com/manotigaz/loja-de-carros-2

---

## Resumo do que foi feito:

### ✅ Organização (SEPARAR)
- [x] Carro.ts - Superclasse
- [x] CarroEletrico.ts - Subclasse
- [x] CarroCombustao.ts - Subclasse
- [x] Cliente.ts - Superclasse abstrata
- [x] ClientePF.ts - Pessoa Física
- [x] ClientePJ.ts - Pessoa Jurídica
- [x] Venda.ts - Classe de Vendas

### ✅ Lógica (DENTRO DAS CLASSES)
- [x] Métodos de Carro: vender(), depreciar(), lucro(), getInfo()
- [x] Métodos de Cliente: getInfo(), getters
- [x] Métodos de Venda: getPrecoFinal(), getInfo()
- [x] Construtores com super() em todas as subclasses

### ✅ Aba de Clientes (PF E PJ)
- [x] Menu de clientes com opções
- [x] Formulário para PF (nome, email, cpf, data nascimento)
- [x] Formulário para PJ (nome, email, cnpj, empresa, inscrição)
- [x] Listar clientes com tipo (PF ou PJ)

### ✅ Classe de Venda
- [x] Classe Venda criada
- [x] Registrar venda com carro + cliente
- [x] Aplicar desconto
- [x] Gerar ID único
- [x] Calcular preço final
- [x] Listar histórico de vendas

### ✅ Interface Melhorada
- [x] Menu principal com 4 opções
- [x] Submenu de carros
- [x] Submenu de clientes
- [x] Formulário de venda
- [x] CSS moderno e responsivo
- [x] Tabelas e listas formatadas
- [x] Suporte a fotos de carros

