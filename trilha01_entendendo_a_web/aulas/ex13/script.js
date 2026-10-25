let idProfessorEmEdicao = null;

function adicionarProfessorNaTabela(professor) {
    const tabela = document.querySelector("#tabela-professores");
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${professor.id}</td>
        <td>${professor.nome}</td>
        <td>${professor.area}</td>
        <td>
            <button class="botao-editar">Editar</button>
            <button class="botao-excluir">Excluir</button>
        </td>
    `;
    tabela.append(linha);

    // Usamos linha.querySelector(...) em vez de document.querySelector(...)
    // porque queremos encontrar o botão daquela linha, e não o primeiro botão Editar da tabela inteira.
    const botaoEditar = linha.querySelector(".botao-editar");

    botaoEditar.addEventListener("click", function () {
        idProfessorEmEdicao = professor.id;

        const inputNome = document.querySelector("#nome");
        const inputArea = document.querySelector("#area");
        const botaoSalvar = document.querySelector("#botao-salvar");

        inputNome.value = professor.nome;
        inputArea.value = professor.area;

        botaoSalvar.textContent = "Salvar alterações";
        botaoCancelar.hidden = false;
    });

    const botaoExcluir = linha.querySelector(".botao-excluir");

    botaoExcluir.addEventListener("click", function () {
        if (!confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
           return;
        }
        fetch("http://localhost:3000/api/professores/" + professor.id, {
            method: "DELETE"
        })
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (resultado) {
            console.log("Professor excluído:", resultado);

            carregarProfessores();
        })
        .catch(function (erro) {
            console.error("Erro ao excluir professor:", erro);
        });
    });
}

const botaoCancelar = document.querySelector("#botao-cancelar");

botaoCancelar.addEventListener("click", function() {
    const inputNome = document.querySelector("#nome");
    const inputArea = document.querySelector("#area");
    const botaoSalvar = document.querySelector("#botao-salvar");
    const mensagem = document.querySelector("#mensagem");

    inputNome.value = "";
    inputArea.value = "";

    idProfessorEmEdicao = null;
    botaoSalvar.textContent = "Cadastrar";
    botaoCancelar.hidden = true;

    mensagem.textContent = "";
    mensagem.className = "";
});

function carregarProfessores() {
    const tabela = document.querySelector("#tabela-professores");

    tabela.innerHTML = "";

    fetch("http://localhost:3000/api/professores")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(professores) {
            professores.forEach(function(professor) {
                adicionarProfessorNaTabela(professor);
            });
        })
        .catch(function(erro) {
            console.error("Erro ao carregar professores:", erro);
        });
}

const formulario = document.querySelector("#form-professor")

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Impede o comportamento padrão do formulário, que faria o navegador recarregar a página.
    
    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = "";
    mensagem.className = "";

    const inputNome = document.querySelector("#nome");
    const inputArea = document.querySelector("#area");
    const botaoSalvar = document.querySelector("#botao-salvar");
    const botaoCancelar = document.querySelector("#botao-cancelar");

    if (inputNome.value.trim() === "" || inputArea.value.trim() === "") {
        mensagem.textContent = "Preencha o nome e a área do professor.";
        mensagem.className = "mensagem erro";
        return;       
    }

    const professor = {
        nome: inputNome.value,
        area: inputArea.value
    };

    let url = "http://localhost:3000/api/professores";
    let metodo = "POST";

    if (idProfessorEmEdicao !== null) {
        url += "/" + idProfessorEmEdicao;
        metodo = "PUT";
    }

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(professor)
    })
    .then(function(resposta) {
        if (! resposta.ok) {
            throw new Error("Erro na requisição: " + resposta.status);
        }
        return resposta.json();
    })
    .then(function(professorSalvo) {
        console.log("Professor salvo:", professorSalvo);

        if (metodo === "POST") {
            mensagem.textContent = "Professor cadastrado com sucesso!";
        } else {
            mensagem.textContent = "Professor atualizado com sucesso!";
        }
        mensagem.className = "mensagem sucesso";

        inputNome.value = "";
        inputArea.value = "";
        idProfessorEmEdicao = null;
        botaoSalvar.textContent = "Cadastrar";
        botaoCancelar.hidden = true;

        carregarProfessores();
    })
    .catch(function(erro) {
        console.error("Erro ao salvar professor:", erro);
        mensagem.textContent = erro.message;
        mensagem.className = "mensagem erro";
    });

});

carregarProfessores();