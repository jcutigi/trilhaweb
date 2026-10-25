const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    const paragrafo = document.querySelector("#mensagem")
    paragrafo.textContent = "O botão foi clicado!"

    fetch("dados.json")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            console.log(dados);
        });
});