# EX10 — Implementando o CRUD completo no frontend

## Objetivo

Neste exercício, vamos integrar a interface web à API desenvolvida nos exercícios anteriores, permitindo realizar todas as operações de cadastro de professores diretamente pelo navegador.

Ao final, a aplicação permitirá:

- **Cadastrar** um professor.
- **Consultar** a lista de professores.
- **Editar** os dados de um professor.
- **Excluir** um professor.

Essas quatro operações formam o CRUD, sigla para *Create, Read, Update e Delete*.

## 1. Preparando o ambiente

Este exercício é uma continuação do EX09. Copiamos o projeto anterior para manter a API já implementada e concentrar o trabalho na integração com o frontend.

A aplicação utiliza dois servidores:

- **Frontend:** disponibiliza os arquivos HTML, CSS e JavaScript em `http://localhost:8000`.
- **Backend:** disponibiliza a API em `http://localhost:3000`.

Inicie os dois servidores conforme as instruções dos exercícios anteriores e abra a página no navegador.

## 2. A interface da aplicação

O arquivo `index.html` contém o formulário de cadastro e a tabela de professores.

O formulário possui campos para nome e área de atuação. O botão de envio é identificado pelo atributo `id="botao-salvar"`.

A tabela apresenta as seguintes colunas:

| Coluna | Finalidade |
|---|---|
| ID | Identificar o professor |
| Nome | Exibir o nome |
| Área | Exibir a área de atuação |
| Ações | Disponibilizar os botões Editar e Excluir |

O arquivo `style.css` define a apresentação visual, enquanto `script.js` implementa a interação com a API.

## 3. Carregando os professores

Quando a página é aberta, o JavaScript chama a função `carregarProfessores()`.

Essa função realiza uma requisição `GET` para:

`http://localhost:3000/api/professores`

A resposta contém a lista de professores em formato JSON. Para cada elemento recebido, o programa chama `adicionarProfessorNaTabela(professor)`, responsável por criar uma linha na tabela.

Antes de preencher a tabela, a função limpa seu conteúdo. Isso evita que as mesmas linhas sejam adicionadas novamente quando a listagem precisar ser atualizada.

A função `carregarProfessores()` também é utilizada depois das operações de cadastro, edição e exclusão.

## 4. Cadastrando um professor — POST

Quando o usuário envia o formulário, um evento `submit` é executado.

O método `preventDefault()` impede que o navegador execute o envio tradicional do formulário, que provocaria o recarregamento da página.

Em seguida, o JavaScript obtém os valores dos campos e constrói um objeto:

```javascript
const professor = {
    nome: inputNome.value,
    area: inputArea.value
};
```

O objeto é convertido para JSON por meio de `JSON.stringify()` e enviado à API utilizando o método HTTP `POST`.

```javascript
fetch(url, {
    method: metodo,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(professor)
});
```

O cabeçalho `Content-Type` informa ao servidor que o corpo da requisição contém dados JSON.

Depois que o servidor salva o novo professor, o JavaScript limpa o formulário e chama `carregarProfessores()` para atualizar a tabela.

## 5. Editando um professor — PUT

O botão Editar preenche o formulário com os dados do professor selecionado.

Para identificar que estamos editando um registro, o programa utiliza a variável:

```javascript
let idProfessorEmEdicao = null;
```

Quando nenhum professor está sendo editado, essa variável vale `null`. Ao clicar em Editar, ela recebe o ID do professor selecionado.

O botão do formulário também muda de texto para indicar que a operação será uma atualização.

No envio do formulário, o programa verifica o valor dessa variável:

- Se ela for `null`, utiliza `POST` para cadastrar um professor.
- Se ela contiver um ID, utiliza `PUT` e acrescenta esse ID ao endereço da API.

Por exemplo, para atualizar o professor de ID 3:

`PUT http://localhost:3000/api/professores/3`

O servidor atualiza os dados e devolve uma resposta. Em seguida, o frontend limpa o formulário, retorna ao modo de cadastro e recarrega a tabela.

Essa solução permite utilizar o mesmo formulário tanto para cadastrar quanto para editar.

## 6. Excluindo um professor — DELETE

Cada linha da tabela possui um botão Excluir.

O evento de clique desse botão realiza uma requisição `DELETE` para o endereço correspondente ao professor selecionado.

Por exemplo:

`DELETE http://localhost:3000/api/professores/3`

Nesse caso, não é necessário enviar um corpo na requisição: o ID presente no endereço identifica o registro que deve ser excluído.

Depois de receber a resposta da API, o frontend chama `carregarProfessores()` novamente. Assim, a tabela passa a exibir apenas os professores que permanecem cadastrados.

A exclusão é executada imediatamente, sem uma etapa de confirmação.

## 7. Comunicação entre frontend e backend

O fluxo geral da aplicação é:

1. O usuário realiza uma ação na interface.
2. O JavaScript identifica o evento.
3. O frontend envia uma requisição HTTP à API.
4. O backend executa a operação solicitada.
5. O servidor devolve uma resposta em JSON.
6. O frontend atualiza a interface quando necessário.

Essa comunicação utiliza `fetch()`, que permite fazer requisições HTTP a partir do JavaScript.

A chamada `resposta.json()` converte o corpo da resposta em um valor JavaScript. Como essa conversão é assíncrona, ela é utilizada dentro de uma cadeia de Promises com `.then()`.

## 8. Por que a tabela é recarregada?

Depois de cadastrar, editar ou excluir um professor, a função `carregarProfessores()` consulta novamente a API e reconstrói a tabela.

Essa estratégia mantém a implementação simples: em vez de criar um código diferente para modificar a tabela em cada operação, reutilizamos uma função responsável por carregar e exibir a lista.

O backend continua sendo responsável por manter os dados persistidos no arquivo `dados.json`. A tabela é apenas uma representação desses dados na interface.

## 9. CORS e comunicação entre portas diferentes

O frontend e o backend utilizam portas diferentes, mesmo estando na mesma máquina. Para o navegador, essas URLs representam origens diferentes.

Por isso, o backend precisa permitir a origem do frontend por meio dos cabeçalhos CORS.

Como a aplicação utiliza os métodos `GET`, `POST`, `PUT` e `DELETE`, o servidor também precisa permitir esses métodos e responder às requisições de verificação `OPTIONS` quando o navegador realizar uma requisição preflight.

Essa configuração permite que o navegador autorize a comunicação entre a página e a API.

## 10. Testando a aplicação

Verifique se todas as operações funcionam:

- Abra a página e confira se a lista de professores é carregada.
- Cadastre um professor e verifique se ele aparece na tabela.
- Edite seu nome ou sua área e confira a atualização.
- Exclua um professor e confirme que ele desaparece da tabela.
- Recarregue a página e confira se as alterações persistiram.

Também é possível acompanhar as requisições na aba Network das ferramentas de desenvolvedor do navegador.

## 11. Conceitos aprendidos

Neste exercício, trabalhamos com:

- Manipulação do DOM para criar linhas e botões dinamicamente.
- Eventos de formulário e de clique.
- Requisições HTTP com `fetch()`.
- Métodos HTTP `GET`, `POST`, `PUT` e `DELETE`.
- Envio e recebimento de dados JSON.
- Promises e encadeamento com `.then()`.
- Identificação de registros por meio de IDs.
- Reutilização de funções.
- Separação entre frontend, backend e persistência de dados.
- CORS e comunicação entre origens diferentes.

## Conclusão

Com o EX10, concluímos a implementação de uma aplicação web que permite realizar as quatro operações do CRUD por meio de uma interface gráfica.

A aplicação ainda utiliza um arquivo JSON como forma de persistência, e a API foi implementada com os recursos nativos do Node.js. Essa abordagem permite compreender os fundamentos da comunicação entre navegador e servidor antes de introduzir frameworks ou bancos de dados.

**Próximo passo:** revisar a organização do código e consolidar os conhecimentos adquiridos antes de avançar para novas tecnologias.
