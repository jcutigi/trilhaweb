const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    const paragrafo = document.querySelector("#mensagem")
    paragrafo.textContent = "O botão foi clicado!"
});