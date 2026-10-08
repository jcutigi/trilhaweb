function adicionarProfessorNaTabela(professor) {
    const tabela = document.querySelector("#tabela-professores");
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${professor.id}</td>
        <td>${professor.nome}</td>
        <td>${professor.area}</td>
    `
    tabela.append(linha);
}

fetch("http://localhost:3000/api/professores")
    .then(function (resposta) {
        return resposta.json();
    })
    .then(function (professores) {
        professores.forEach(function (professor) {
            adicionarProfessorNaTabela(professor);
        });
    });

const formulario = document.querySelector("#form-professor")

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Impede o comportamento padrão do formulário, que faria o navegador recarregar a página.

    const inputNome = document.querySelector("#nome");
    const inputArea = document.querySelector("#area");

    fetch("http://localhost:3000/api/professores", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nome: inputNome.value,
            area: inputArea.value
        })
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(professor) {
        console.log("Professor adicionado:", professor);
        adicionarProfessorNaTabela(professor);
        inputNome.value = "";
        inputArea.value = "";
    })
    .catch(function(erro) {
        console.error("Erro ao cadastrar professor:", erro);
    });

});