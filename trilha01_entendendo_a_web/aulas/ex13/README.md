# EX13 — CSS e responsividade

## Objetivo

Neste exercício, melhoramos a apresentação visual do sistema de cadastro de professores e introduzimos conceitos de organização semântica do HTML, estilização com CSS e design responsivo.

Até aqui, nosso foco principal era entender como o navegador, o JavaScript e a API se comunicam. Agora, vamos dedicar atenção à experiência de quem utiliza o sistema.

## 1. Organização semântica do HTML

No HTML, podemos utilizar elementos que indicam o papel de cada parte da página.

Neste exercício, organizamos o conteúdo utilizando:

- `<header>`: representa o cabeçalho da página.
- `<main>`: identifica o conteúdo principal.
- `<section>`: agrupa conteúdos relacionados.
- `<form>`: reúne os campos e botões do formulário.
- `<table>`: organiza os professores cadastrados em linhas e colunas.

Essa organização torna o documento mais claro e facilita sua manutenção. Elementos semânticos também ajudam tecnologias assistivas, como leitores de tela, a interpretar a estrutura da página.

É importante observar que esses elementos não substituem o CSS. O HTML define a estrutura e o significado do conteúdo; o CSS define sua apresentação visual.

## 2. Estilização com CSS

O arquivo `style.css` concentra as regras responsáveis pela aparência da página.

### 2.1. Seletores

Os seletores indicam quais elementos serão afetados por uma regra CSS.

Por exemplo:

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    color: #333;
}
```

Nesse caso, o seletor `body` aplica as propriedades a toda a área principal do documento.

Também utilizamos seletores por identificador, como `#botao-salvar`, e por classe, como `.mensagem.sucesso`.

A diferença é que um seletor de elemento, como `button`, pode atingir vários elementos; um seletor por ID identifica um elemento específico; e uma classe permite aplicar o mesmo conjunto de estilos a diferentes elementos.

### 2.2. Espaçamentos e dimensões

Algumas propriedades importantes utilizadas neste exercício foram:

- `margin`: define o espaçamento externo de um elemento.
- `padding`: define o espaçamento entre o conteúdo e a borda.
- `max-width`: limita a largura máxima de um elemento.
- `width`: define a largura.
- `border-radius`: arredonda os cantos.
- `box-sizing`: determina como a largura e a altura calculadas consideram o conteúdo, o preenchimento e a borda.

Por exemplo:

```css
main {
    max-width: 1000px;
    margin: 24px auto;
    padding: 0 20px;
}
```

A propriedade `max-width` limita a largura do conteúdo principal. O valor `margin: 24px auto` cria espaçamento vertical e distribui automaticamente o espaço horizontal disponível, centralizando o elemento quando há espaço suficiente.

### 2.3. Flexbox no formulário

Utilizamos Flexbox para organizar os elementos do formulário:

```css
form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
```

- `display: flex` ativa o modelo de layout Flexbox.
- `flex-direction: column` organiza os elementos em uma coluna.
- `gap` define o espaçamento entre os elementos.

Essa organização permite manter os campos e os botões alinhados verticalmente, sem precisar controlar individualmente a posição de cada elemento.

## 3. Organização visual da tabela

A tabela utiliza regras CSS para ocupar a largura disponível e apresentar os dados de forma organizada.

```css
table {
    width: 100%;
    border-collapse: collapse;
}
```

A propriedade `width: 100%` faz a tabela ocupar toda a largura disponível em seu contêiner.

Já `border-collapse: collapse` combina as bordas das células adjacentes, evitando que apareçam como linhas duplas.

Também estilizamos os elementos `<th>` e `<td>` para definir espaçamento interno, alinhamento do texto e separação visual entre as linhas.

## 4. Rolagem horizontal da tabela

Uma tabela com várias colunas pode não caber na largura de um celular. Para evitar que o conteúdo ultrapasse a área disponível, colocamos a tabela dentro de um contêiner:

```html
<div class="tabela-container">
    <table>
        <!-- Cabeçalho e dados da tabela -->
    </table>
</div>
```

E aplicamos a seguinte regra:

```css
.tabela-container {
    width: 100%;
    overflow-x: auto;
}
```

A propriedade `overflow-x: auto` permite a rolagem horizontal quando o conteúdo ultrapassa a largura do contêiner.

Essa solução é útil porque preserva as colunas e seus conteúdos. Em vez de tentar comprimir toda a tabela em uma tela estreita, permitimos que a pessoa navegue horizontalmente para consultar as informações.

Observe que a rolagem só será necessária quando o conteúdo ultrapassar a largura disponível.

## 5. Design responsivo com media queries

Design responsivo é a prática de adaptar a apresentação de uma página a diferentes tamanhos de tela.

Para isso, utilizamos uma *media query*:

```css
@media (max-width: 600px) {
    main {
        padding: 0 10px;
    }

    section {
        padding: 16px;
    }

    input {
        box-sizing: border-box;
        width: 100%;
    }

    button {
        width: 100%;
    }
}
```

A condição `max-width: 600px` faz com que essas regras sejam aplicadas quando a largura da área de visualização do navegador for de, no máximo, 600 pixels CSS.

Nesse cenário:

- O conteúdo principal utiliza margens laterais menores.
- As seções têm menos espaçamento interno.
- Os campos do formulário ocupam toda a largura disponível.
- Os botões também ocupam toda a largura disponível.

O resultado é uma interface mais adequada para telas estreitas.

### Por que usar `box-sizing: border-box`?

Por padrão, a largura definida com `width` considera apenas a área de conteúdo. O preenchimento (`padding`) e a borda podem ser acrescentados a essa largura.

Com `box-sizing: border-box`, a largura definida passa a incluir conteúdo, preenchimento e bordas.

Assim, `width: 100%` pode ser utilizado sem que o preenchimento e as bordas façam o campo ultrapassar a largura do contêiner.

### A media query é a única responsável pela responsividade?

Não. A responsividade resulta da combinação de várias decisões de layout.

Neste exercício, por exemplo, `max-width`, `width: 100%`, Flexbox e `overflow-x: auto` também contribuem para a adaptação da página. A media query permite aplicar ajustes específicos quando a tela fica estreita.

## 6. O CSS não altera a lógica do sistema

Uma característica importante deste exercício é que melhoramos a interface sem modificar a lógica principal da aplicação.

O JavaScript continua responsável por:

- Carregar os professores da API.
- Enviar solicitações para cadastrar e editar professores.
- Solicitar a exclusão de registros.
- Exibir mensagens de sucesso e erro.
- Controlar o estado de edição do formulário.

O HTML organiza o conteúdo, o CSS controla sua apresentação e o JavaScript implementa as interações. A API continua responsável pelo processamento das solicitações e pelo acesso aos dados.

Essa separação de responsabilidades facilita a compreensão e a evolução do sistema.

## 7. Resultado

Ao concluir o EX13, nosso sistema passou a ter:

- Estrutura HTML mais organizada e semântica.
- Identidade visual consistente.
- Formulário e botões estilizados.
- Tabela com melhor apresentação.
- Rolagem horizontal quando a tabela não cabe na tela.
- Ajustes específicos para telas estreitas.

O sistema continua sendo uma aplicação simples, construída com HTML, CSS e JavaScript, comunicando-se com uma API desenvolvida em Node.js.

## 8. O que aprendemos?

Ao longo deste exercício, vimos que a construção de uma aplicação Web envolve mais do que fazer o sistema funcionar. Também precisamos organizar o conteúdo e apresentar as informações de maneira clara em diferentes dispositivos.

Aprendemos a utilizar elementos semânticos do HTML, seletores e propriedades CSS, Flexbox, contêineres com rolagem horizontal e media queries.

Esses conhecimentos constituem uma base importante para, futuramente, estudar ferramentas e bibliotecas de interface mais avançadas.

## Próximo passo

No EX14, vamos abordar um problema que ainda existe no nosso sistema: os dados são armazenados em um arquivo JSON. Vamos estudar como utilizar um banco de dados relacional para persistir os professores cadastrados.
