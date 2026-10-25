# EX15 — Organização e refinamento da aplicação

Neste exercício, finalizamos a aplicação de cadastro de professores, organizando o frontend e o backend em diretórios separados e revisando a implementação para melhorar sua legibilidade, manutenção e configuração.

O sistema utiliza HTML, CSS e JavaScript no frontend, uma API HTTP implementada com Node.js no backend e PostgreSQL para persistência dos dados.

Além da organização dos arquivos, realizamos refatorações no código existente, preservando a arquitetura construída ao longo dos exercícios anteriores.

## 1. Objetivos

- Organizar o projeto em `frontend/` e `backend/`.
- Revisar o código do frontend e do backend.
- Centralizar as configurações de conexão entre os componentes.
- Utilizar variáveis de ambiente para configurar o servidor e o CORS.
- Melhorar a validação das requisições e o tratamento de erros.
- Utilizar expressões regulares para identificar rotas de recursos específicos.
- Melhorar a criação e atualização dos elementos da tabela.
- Revisar o fluxo de cadastro, edição e exclusão.
- Manter as credenciais do banco de dados fora do controle de versão.

## 2. Estrutura do projeto

```text
ex15/
├── README.md
├── frontend/
│   ├── index.html
│   ├── config.js
│   ├── script.js
│   └── style.css
└── backend/
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── db.js
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── sql/
        └── 01_criar_tabela_professores.sql
```

O diretório `frontend/` contém a interface da aplicação. O diretório `backend/` contém o servidor HTTP, a comunicação com o banco de dados e os arquivos de configuração.

O arquivo `.env` contém configurações locais e credenciais e não deve ser versionado. O `.env.example` apresenta um modelo para configurar o ambiente.

A pasta `node_modules/` é criada durante a instalação das dependências e não deve ser incluída no repositório.

---

# 3. Backend

O backend disponibiliza a API HTTP, valida as requisições recebidas, executa as operações no PostgreSQL e retorna respostas ao cliente.

## 3.1. Tecnologias utilizadas

- Node.js: execução do JavaScript no servidor.
- Módulo `http`: criação do servidor HTTP.
- `pg`: comunicação com o PostgreSQL.
- `dotenv`: carregamento de variáveis de ambiente.
- Expressões regulares: identificação de rotas de recursos específicos.

## 3.2. Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `server.js` | Criação do servidor HTTP, tratamento das rotas, validação das requisições e respostas da API. |
| `db.js` | Configuração da conexão com o PostgreSQL. |
| `.env` | Configurações locais do ambiente, incluindo credenciais do banco. |
| `.env.example` | Modelo das variáveis de ambiente necessárias. |
| `package.json` | Metadados do projeto e dependências. |
| `sql/01_criar_tabela_professores.sql` | Script SQL para criação da tabela de professores. |

## 3.3. Centralização das configurações do servidor

Anteriormente, a porta da API e a origem permitida pelo CORS apareciam diretamente no código.

Por exemplo, a porta poderia estar escrita no `server.listen()` e a origem do frontend, no cabeçalho `Access-Control-Allow-Origin`.

Isso dificultava a manutenção: uma alteração exigiria procurar e modificar os valores em diferentes pontos.

No EX15, passamos a utilizar variáveis de ambiente:

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:8000
```

No `server.js`, essas configurações são recuperadas com valores padrão:

```javascript
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN =
    process.env.FRONTEND_ORIGIN || "http://localhost:8000";
```

A porta é utilizada na inicialização:

```javascript
servidor.listen(PORT, function () {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

E a origem permitida é utilizada no CORS:

```javascript
res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
```

Dessa forma, as configurações ficam separadas da lógica que implementa a API.

O carregamento explícito do `dotenv` no início do `server.js` também deixa claro que as variáveis de ambiente precisam estar disponíveis antes de serem utilizadas.

## 3.4. Organização e identificação das rotas com expressões regulares

A API possui rotas para acessar a coleção de professores e recursos individuais.

Exemplos:

```text
/api/professores
/api/professores/1
/api/professores/25
```

A primeira URL representa a coleção. As demais representam professores específicos, identificados por seus IDs.

Para reconhecer a rota de um professor específico, utilizamos uma expressão regular:

```javascript
const rotaProfessor = /^\/api\/professores\/(\d+)$/;
```

Vamos entender seus componentes:

| Trecho | Significado |
|---|---|
| `^` | Início da string. |
| `\/api\/professores\/` | Caminho literal `/api/professores/`. |
| `(\d+)` | Um ou mais dígitos, capturados para obter o ID. |
| `$` | Final da string. |

A expressão permite reconhecer caminhos como:

```text
/api/professores/1
/api/professores/25
```

E rejeitar caminhos que não correspondam ao padrão, como:

```text
/api/professores/abc
/api/professores/1/outra-coisa
```

A captura do ID pode ser utilizada para extrair seu valor:

```javascript
const id = Number(req.url.match(rotaProfessor)[1]);
```

A expressão regular também pode ser utilizada com `test()` para verificar se uma URL corresponde ao padrão.

**Por que fizemos essa mudança?**

Em vez de depender apenas da divisão da URL por barras e de posições fixas do array resultante, passamos a verificar explicitamente o formato esperado para uma rota de recurso individual.

Isso torna a intenção do código mais clara e facilita a identificação das rotas que trabalham com um professor específico.

A expressão regular verifica o formato do caminho, mas não garante, por si só, que o ID corresponda a um professor existente. Essa verificação continua sendo responsabilidade da consulta ao banco de dados.

## 3.5. Validação dos dados recebidos

As operações de cadastro e atualização precisam verificar se os dados enviados pelo cliente são válidos.

Para evitar repetir a mesma lógica em diferentes rotas, utilizamos uma função:

```javascript
function validarProfessor(dados) {
    return dados &&
        typeof dados.nome === "string" && dados.nome.trim() !== "" &&
        typeof dados.area === "string" && dados.area.trim() !== "";
}
```

A função verifica se o objeto existe e se os campos `nome` e `area` são strings não vazias após a remoção dos espaços nas extremidades.

O uso de `trim()` impede que um campo preenchido somente com espaços seja considerado válido.

A função é reutilizada pelas operações que recebem dados de um professor, como `POST` e `PUT`.

**Benefício da refatoração:** se a regra de validação mudar, podemos modificar uma única função, em vez de atualizar vários trechos da API.

Essa validação trata os campos obrigatórios e seus tipos. Regras adicionais, como tamanho máximo dos campos, podem ser incorporadas conforme a necessidade da aplicação.

## 3.6. Tratamento das requisições e respostas HTTP

O servidor identifica o método HTTP e o caminho solicitado para determinar a operação a executar.

As operações disponíveis são:

| Método | Endpoint | Operação |
|---|---|---|
| `GET` | `/api/professores` | Lista os professores. |
| `GET` | `/api/professores/:id` | Consulta um professor pelo ID. |
| `POST` | `/api/professores` | Cadastra um professor. |
| `PUT` | `/api/professores/:id` | Atualiza um professor existente. |
| `DELETE` | `/api/professores/:id` | Exclui um professor. |

As operações que recebem dados utilizam JSON no corpo da requisição. O servidor interpreta esse conteúdo e verifica se os dados são válidos antes de executar a operação correspondente.

A API também configura os cabeçalhos HTTP para indicar o formato das respostas e os métodos permitidos pelo CORS.

Entre eles:

- `Content-Type`: informa que as respostas contêm JSON codificado em UTF-8.
- `Access-Control-Allow-Origin`: define a origem autorizada.
- `Access-Control-Allow-Headers`: permite o cabeçalho `Content-Type`.
- `Access-Control-Allow-Methods`: informa os métodos HTTP permitidos.

## 3.7. Tratamento da requisição OPTIONS

Antes de determinadas requisições entre origens diferentes, o navegador envia uma requisição de verificação chamada *preflight*, utilizando o método `OPTIONS`.

O servidor responde a essa verificação sem executar a operação de negócio:

```javascript
if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
}
```

O status `204 No Content` indica que a requisição foi atendida sem necessidade de retornar um corpo.

O `return` encerra o processamento daquela requisição. Sem ele, o código poderia continuar e tentar executar outra rota desnecessariamente.

## 3.8. Tratamento de erros

A API verifica os dados recebidos e o resultado das operações solicitadas.

Entre as situações tratadas estão:

- dados inválidos enviados pelo cliente;
- recurso inexistente;
- requisição com método ou rota não reconhecidos;
- falhas durante a comunicação com o banco de dados.

Os códigos de status HTTP permitem que o cliente diferencie os resultados.

| Status | Significado |
|---|---|
| `200 OK` | Operação realizada com sucesso. |
| `201 Created` | Recurso criado com sucesso. |
| `204 No Content` | Requisição atendida sem corpo na resposta. |
| `400 Bad Request` | Dados ou requisição inválidos. |
| `404 Not Found` | Recurso ou rota não encontrado. |
| `500 Internal Server Error` | Erro interno durante o processamento. |

O cliente não deve depender apenas do corpo da resposta para identificar uma falha. O código de status também precisa ser considerado.

---

# 4. Frontend

O frontend apresenta a interface de cadastro e gerencia a interação com o usuário.

O JavaScript realiza as requisições HTTP para a API e atualiza a tabela conforme os resultados recebidos.

## 4.1. Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura da página e formulário. |
| `config.js` | Centralização do endereço-base da API. |
| `script.js` | Listagem, cadastro, edição, exclusão e tratamento das respostas. |
| `style.css` | Estilos da interface e adaptação a telas menores. |

## 4.2. Centralização do endereço da API

Antes da refatoração, o endereço da API aparecia diretamente nas chamadas `fetch()` do `script.js`.

Por exemplo:

```javascript
fetch("http://localhost:3000/api/professores");
```

Se o endereço ou a porta mudasse, seria necessário modificar todas as ocorrências.

Para evitar essa repetição, criamos o arquivo `config.js`:

```javascript
const API_BASE_URL = "http://localhost:3000";
```

No `index.html`, ele é carregado antes do `script.js`:

```html
<script src="config.js"></script>
<script src="script.js"></script>
```

Assim, as requisições passam a utilizar a constante:

```javascript
fetch(API_BASE_URL + "/api/professores");
```

Para acessar um professor específico:

```javascript
fetch(API_BASE_URL + "/api/professores/" + professor.id);
```

Essa configuração é utilizada nas operações de listagem, cadastro, atualização e exclusão.

**Benefício da refatoração:** o endereço-base da API é definido em um único lugar, reduzindo a duplicação e facilitando futuras mudanças de ambiente.

O `config.js` contém somente configurações públicas. Senhas e credenciais do banco de dados nunca devem ser colocadas nesse arquivo, pois ele é enviado ao navegador.

## 4.3. Organização das funções do JavaScript

O `script.js` foi organizado em funções que separam responsabilidades.

| Função ou elemento | Responsabilidade |
|---|---|
| `limparFormulario()` | Limpa os campos e restaura o estado inicial do formulário. |
| `adicionarProfessorNaTabela(professor)` | Cria a linha de um professor e seus botões de ação. |
| `carregarProfessores()` | Busca a lista na API e atualiza a tabela. |
| Evento de envio do formulário | Valida os campos e executa o cadastro ou a atualização. |
| Evento de edição | Preenche o formulário com os dados do professor selecionado. |
| Evento de exclusão | Solicita confirmação e envia a requisição de exclusão. |
| Evento de cancelamento | Encerra a edição e limpa o formulário. |

A separação facilita a leitura do código e evita concentrar todas as operações em uma única função.

## 4.4. Criação das linhas da tabela com o DOM

A função `adicionarProfessorNaTabela()` cria os elementos HTML necessários para representar cada professor.

Em vez de montar uma string HTML com os dados recebidos, utilizamos métodos do DOM, como:

```javascript
document.createElement("tr");
document.createElement("td");
```

Para inserir os valores recebidos da API, utilizamos `textContent`.

Por exemplo:

```javascript
const celulaNome = document.createElement("td");
celulaNome.textContent = professor.nome;
```

O mesmo princípio é utilizado para o ID e a área do professor.

**Por que fizemos essa mudança?**

Inserir dados externos com `textContent` evita que o navegador interprete esses valores como marcação HTML. Isso reduz o risco de que um nome ou uma área contendo conteúdo HTML seja executado ou interpretado como parte da página.

Os botões de editar e excluir são criados programaticamente e associados à linha correspondente.

## 4.5. Estado da edição

O frontend utiliza a variável:

```javascript
let idProfessorEmEdicao = null;
```

Ela indica se o formulário está sendo utilizado para cadastrar um professor ou editar um registro existente.

- Quando o valor é `null`, o formulário realiza um cadastro com `POST`.
- Quando contém um ID, o formulário realiza uma atualização com `PUT`.

No envio do formulário, a URL e o método são definidos conforme esse estado:

```javascript
let url = API_BASE_URL + "/api/professores";
let metodo = "POST";

if (idProfessorEmEdicao !== null) {
    url += "/" + idProfessorEmEdicao;
    metodo = "PUT";
}
```

Essa abordagem evita manter dois formulários ou duplicar toda a lógica de envio.

Ao iniciar uma edição, os dados do professor são colocados nos campos e o botão principal muda de “Cadastrar” para “Salvar alterações”.

O botão “Cancelar edição” chama `limparFormulario()`, que restaura o estado inicial.

## 4.6. Validação do formulário

Antes de enviar os dados à API, o frontend verifica se os campos obrigatórios foram preenchidos:

```javascript
if (inputNome.value.trim() === "" ||
    inputArea.value.trim() === "") {
    // Exibe uma mensagem e encerra o processamento.
    return;
}
```

Essa verificação melhora a experiência do usuário ao identificar campos vazios antes de realizar a requisição.

A validação do frontend não substitui a validação do backend. Um cliente pode enviar requisições diretamente à API, sem utilizar o formulário.

Por isso, as regras também precisam ser verificadas no servidor.

## 4.7. Verificação das respostas HTTP

Nas chamadas `fetch()`, o código verifica a propriedade `ok` da resposta:

```javascript
.then(function(resposta) {
    if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.status);
    }

    return resposta.json();
})
```

O `fetch()` não rejeita automaticamente a Promise quando o servidor responde com status como `400`, `404` ou `500`.

Por isso, verificar `resposta.ok` é importante para que essas respostas sejam tratadas como falhas pela lógica do frontend.

Quando a resposta não é bem-sucedida, lançamos um erro que pode ser tratado pelo `catch()`.

Essa verificação é utilizada nas operações de listagem, cadastro, atualização e exclusão.

## 4.8. Tratamento de erros no frontend

As chamadas assíncronas utilizam `catch()` para tratar falhas, como:

- API indisponível;
- problemas de rede;
- respostas HTTP não bem-sucedidas;
- falhas ao interpretar o JSON recebido.

O frontend registra detalhes técnicos no console e apresenta mensagens mais simples na interface.

Por exemplo, ao carregar a lista, o usuário recebe uma mensagem informando que não foi possível carregar os professores e que deve verificar se a API está disponível.

No cadastro e na atualização, a interface informa que não foi possível salvar o professor. Na exclusão, informa que a operação falhou.

Essa separação evita apresentar detalhes técnicos desnecessários ao usuário, mantendo informações úteis para depuração no console.

## 4.9. Confirmação antes da exclusão

Antes de excluir um professor, o frontend solicita confirmação:

```javascript
if (!confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
    return;
}
```

Se o usuário cancelar, a operação não é enviada à API.

Se confirmar, o frontend envia uma requisição `DELETE` para o recurso correspondente.

Essa confirmação reduz exclusões acidentais.

## 4.10. Recarregamento da tabela após as operações

Depois de cadastrar, atualizar ou excluir um professor, o frontend chama:

```javascript
carregarProfessores();
```

A função realiza uma nova requisição `GET` e reconstrói a tabela com os dados retornados pela API.

Isso mantém a tabela sincronizada com os dados persistidos no PostgreSQL e evita implementar uma lógica diferente para atualizar a interface após cada operação.

Existe uma limitação nessa abordagem: ela gera uma requisição adicional. Além disso, se a operação de cadastro, atualização ou exclusão funcionar, mas a requisição posterior de listagem falhar, a interface poderá ficar desatualizada.

Para o objetivo didático do EX15, mantivemos essa solução simples. Uma estratégia mais sofisticada poderia atualizar a tabela diretamente a partir do recurso retornado pela API.

---

# 5. Banco de dados

O projeto utiliza PostgreSQL para persistir os professores.

Banco de dados:

```text
cadastro_professores
```

Tabela:

```sql
CREATE TABLE professores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL
);
```

A tabela possui:

| Coluna | Tipo | Restrição |
|---|---|---|
| `id` | `INTEGER` | Chave primária gerada automaticamente. |
| `nome` | `VARCHAR(100)` | Obrigatório. |
| `area` | `VARCHAR(100)` | Obrigatório. |

O script SQL versionado no projeto é a referência para a criação da tabela. Antes de executar a aplicação, crie o banco, caso ainda não exista, e execute `sql/01_criar_tabela_professores.sql`.

O arquivo `db.js` configura a conexão utilizando as variáveis de ambiente e o pacote `pg`.

---

# 6. Configuração e execução

## 6.1. Preparar o backend

Entre no diretório:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do `.env.example` e configure as credenciais do PostgreSQL.

Verifique se o PostgreSQL está em execução, se o banco foi criado e se a tabela `professores` existe.

Inicie a API:

```bash
node server.js
```

Por padrão, ela estará disponível em:

```text
http://localhost:3000
```

## 6.2. Preparar o frontend

Em outro terminal, entre no diretório `frontend`:

```bash
cd frontend
```

Inicie um servidor HTTP estático utilizando Python:

```bash
python3 -m http.server 8000
```

Abra o navegador em:

```text
http://localhost:8000
```

O frontend utiliza o endereço definido em `config.js` para se comunicar com a API.

## 6.3. CORS

Como o frontend e o backend utilizam portas diferentes, o navegador considera suas origens distintas.

O backend utiliza a variável `FRONTEND_ORIGIN` para configurar a origem permitida pelo CORS.

No ambiente local, o valor padrão é:

```text
http://localhost:8000
```

Se o endereço ou a porta do frontend mudar, será necessário atualizar essa configuração.

---

# 7. Testes

Com o banco de dados, o backend e o frontend em execução, verifique:

- [ ] A lista de professores é carregada.
- [ ] É possível cadastrar um professor.
- [ ] Campos vazios são rejeitados pelo formulário.
- [ ] É possível editar um professor existente.
- [ ] É possível cancelar uma edição.
- [ ] É possível excluir um professor após confirmação.
- [ ] A tabela é recarregada após as operações.
- [ ] Os dados permanecem salvos após atualizar a página.
- [ ] A interface apresenta mensagens de erro quando a API está indisponível.
- [ ] A API pode ser testada diretamente pelo Postman.

---

# 8. Considerações finais

O EX15 conclui a primeira trilha de desenvolvimento Web, consolidando uma aplicação construída sem frameworks.

Além de organizar os arquivos, o exercício reforçou práticas importantes de desenvolvimento:

- separar a configuração da lógica de negócio;
- centralizar o endereço da API;
- utilizar variáveis de ambiente;
- reconhecer rotas por meio de expressões regulares;
- reutilizar funções de validação;
- utilizar `textContent` para inserir dados no DOM;
- verificar os status das respostas HTTP;
- tratar falhas de rede e de requisições;
- separar as responsabilidades das funções do frontend;
- manter a interface sincronizada com os dados persistidos;
- preservar as credenciais fora do controle de versão.

A aplicação final permite gerenciar professores com persistência em banco de dados relacional e oferece uma base para estudar frameworks e arquiteturas mais estruturadas na próxima trilha.
