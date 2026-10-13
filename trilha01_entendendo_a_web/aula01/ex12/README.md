# EX12 — Melhorando a experiência do usuário

## Objetivo

Neste exercício, vamos melhorar a interação do usuário com o cadastro de professores desenvolvido nos exercícios anteriores.

A aplicação já permite cadastrar, consultar, atualizar e excluir professores. Agora, vamos tornar seu uso mais claro e seguro, incluindo mensagens de feedback, confirmação de exclusão e a possibilidade de cancelar uma edição.

## 1. Mensagens de feedback

Quando o usuário cadastra ou atualiza um professor, a aplicação exibe uma mensagem indicando que a operação foi realizada com sucesso. Se ocorrer um erro ou o formulário estiver incompleto, uma mensagem informa o problema.

No HTML, utilizamos um elemento para exibir essas mensagens:

```html
<p id="mensagem"></p>
```

No JavaScript, podemos modificar seu conteúdo usando `textContent`:

```javascript
mensagem.textContent = "Professor cadastrado com sucesso!";
```

Para diferenciar mensagens de sucesso e de erro, utilizamos classes CSS:

```javascript
mensagem.className = "mensagem sucesso";
```

Ou:

```javascript
mensagem.className = "mensagem erro";
```

A propriedade `className` define as classes do elemento. No primeiro exemplo, ele recebe as classes `mensagem` e `sucesso`; no segundo, recebe `mensagem` e `erro`.

No arquivo CSS, essas classes determinam a aparência das mensagens:

```css
.mensagem {
    margin-top: 12px;
    padding: 10px;
    border-radius: 4px;
}

.mensagem.sucesso {
    color: #155724;
    background-color: #d4edda;
}

.mensagem.erro {
    color: #721c24;
    background-color: #f8d7da;
}
```

O seletor `.mensagem.sucesso` seleciona um elemento que possui as duas classes simultaneamente. Já `.mensagem.erro` seleciona um elemento que possui as classes `mensagem` e `erro`.

Essa organização separa responsabilidades: o JavaScript define o conteúdo e o tipo da mensagem, enquanto o CSS define sua apresentação.

## 2. Confirmação antes da exclusão

Excluir um registro é uma operação que pode causar perda de dados. Por isso, antes de enviar a requisição DELETE à API, pedimos a confirmação do usuário.

```javascript
if (!confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
    return;
}
```

A função `confirm()` exibe uma caixa de diálogo nativa do navegador e retorna um valor booleano:

- `true`: o usuário confirmou.
- `false`: o usuário cancelou.

O operador `!` inverte o resultado. Assim, se o usuário cancelar, a condição será verdadeira e o `return` encerrará a função antes da requisição.

A exclusão só prossegue quando o usuário confirma.

## 3. Cancelamento da edição

Ao clicar em Editar, o sistema preenche o formulário com os dados do professor e altera o texto do botão principal para “Salvar alterações”.

Também mostramos um botão específico para cancelar:

```html
<button type="button" id="botao-cancelar" hidden>
    Cancelar edição
</button>
```

O atributo `hidden` faz com que o botão fique oculto inicialmente.

Quando a edição começa, o JavaScript utiliza:

```javascript
botaoCancelar.hidden = false;
```

Após salvar as alterações ou cancelar a edição, utilizamos:

```javascript
botaoCancelar.hidden = true;
```

Dessa forma, o botão aparece apenas quando necessário.

### O que acontece ao cancelar?

O evento de clique do botão executa as seguintes ações:

- Limpa os campos do formulário.
- Define `idProfessorEmEdicao = null`.
- Restaura o texto do botão principal para “Cadastrar”.
- Oculta o botão de cancelamento.
- Limpa a mensagem anterior.

A atribuição `idProfessorEmEdicao = null` é importante porque essa variável determina se o formulário está cadastrando um novo professor ou atualizando um existente.

Quando ela contém um identificador, o sistema utiliza PUT. Quando contém `null`, utiliza POST.

O cancelamento não envia uma requisição à API. Como as alterações ainda não foram salvas, basta restaurar o estado do formulário.

## 4. Registrando eventos

O evento de clique do botão Cancelar é registrado uma única vez, fora da função que cria as linhas da tabela:

```javascript
const botaoCancelar = document.querySelector("#botao-cancelar");

botaoCancelar.addEventListener("click", function() {
    // Código que cancela a edição
});
```

Essa organização evita registrar repetidamente o mesmo evento.

Se o `addEventListener()` fosse executado dentro do evento de clique em Editar, cada novo clique em Editar adicionaria outro manipulador ao botão Cancelar. Como consequência, uma única ação poderia executar várias funções de cancelamento.

Esse exemplo mostra por que a localização do registro de eventos também é importante na organização do código.

## 5. Conceitos trabalhados

Ao concluir este exercício, você praticou:

- **DOM:** localizar e modificar elementos HTML com JavaScript.
- **Eventos:** responder a cliques e ao envio de formulários.
- **Estado da interface:** controlar se o formulário está em modo de cadastro ou edição.
- **Classes CSS:** alterar a apresentação dos elementos conforme a situação.
- **Confirmação:** solicitar autorização antes de executar uma operação destrutiva.
- **Funções de controle de fluxo:** utilizar `if`, `!` e `return` para decidir se uma operação deve continuar.
- **Organização de eventos:** registrar cada manipulador no local adequado.

## 6. Atividades para reflexão

1. Por que o botão Cancelar deve ser do tipo `button`, e não `submit`?
2. O que aconteceria se esquecêssemos de definir `idProfessorEmEdicao = null` ao cancelar uma edição?
3. Por que é importante registrar o evento do botão Cancelar uma única vez?
4. Qual é a diferença entre cancelar uma edição e excluir um professor?
5. Como poderíamos melhorar a experiência do usuário para que as mensagens de feedback desaparecessem automaticamente?

## Conclusão

Neste exercício, aprimoramos a experiência de uso do cadastro de professores sem introduzir bibliotecas ou frameworks. As melhorias foram construídas com HTML, CSS e JavaScript, aproveitando os conceitos estudados ao longo dos exercícios anteriores.

O objetivo é compreender como pequenas decisões na interface e na organização do código podem tornar uma aplicação mais clara, previsível e segura para quem a utiliza.