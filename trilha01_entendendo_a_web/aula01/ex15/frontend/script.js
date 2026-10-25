let idProfessorEmEdicao = null;

function limparFormulario() {
    const inputNome = document.querySelector("#nome");
    const inputArea = document.querySelector("#area");
    const botaoSalvar = document.querySelector("#botao-salvar");
    const botaoCancelar = document.querySelector("#botao-cancelar");
    const mensagem = document.querySelector("#mensagem");

    inputNome.value = "";
    inputArea.value = "";

    idProfessorEmEdicao = null;
    botaoSalvar.textContent = "Cadastrar";
    botaoCancelar.hidden = true;

    mensagem.textContent = "";
    mensagem.className = "";
}


function adicionarProfessorNaTabela(professor) {
    const tabela = document.querySelector("#tabela-professores");
    const linha = document.createElement("tr");

    const celulaId = document.createElement("td");
    celulaId.textContent = professor.id;

    const celulaNome = document.createElement("td");
    celulaNome.textContent = professor.nome;

    const celulaArea = document.createElement("td");
    celulaArea.textContent = professor.area;

    const celulaAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "botao-editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";

    celulaAcoes.append(botaoEditar, botaoExcluir);
    linha.append(celulaId, celulaNome, celulaArea, celulaAcoes);
    tabela.append(linha);

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

    botaoExcluir.addEventListener("click", function () {
        if (!confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
           return;
        }
        fetch(API_BASE_URL + "/api/professores/" + professor.id, {
            method: "DELETE"
        })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro na requisição: " + resposta.status);
            }

            return resposta.json();
        })
        .then(function (resultado) {
            console.log("Professor excluído:", resultado);

            carregarProfessores();
        })
        .catch(function (erro) {
            console.error("Erro ao excluir professor:", erro);

            const mensagem = document.querySelector("#mensagem");
            mensagem.textContent = "Não foi possível excluir o professor. Tente novamente.";
            mensagem.className = "mensagem erro";
        });
    });
}

const botaoCancelar = document.querySelector("#botao-cancelar");

botaoCancelar.addEventListener("click", function() {
    limparFormulario();
});


function carregarProfessores() {
    const tabela = document.querySelector("#tabela-professores");

    fetch(API_BASE_URL + "/api/professores")
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error("Erro na requisição: " + resposta.status);
            }

            return resposta.json();
        })
        .then(function(professores) {
            tabela.innerHTML = "";

            professores.forEach(function(professor) {
                adicionarProfessorNaTabela(professor);
            });
        })
        .catch(function(erro) {
            console.error("Erro ao carregar professores:", erro);
            
            const mensagem = document.querySelector("#mensagem");
            mensagem.textContent = "Não foi possível carregar os professores. Verifique se a API está disponível.";
            mensagem.className = "mensagem erro";
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

    if (inputNome.value.trim() === "" || inputArea.value.trim() === "") {
        mensagem.textContent = "Preencha o nome e a área do professor.";
        mensagem.className = "mensagem erro";
        return;       
    }

    const professor = {
        nome: inputNome.value,
        area: inputArea.value
    };

    let url = API_BASE_URL + "/api/professores";
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

        limparFormulario();
        
        if (metodo === "POST") {
            mensagem.textContent = "Professor cadastrado com sucesso!";
        } else {
            mensagem.textContent = "Professor atualizado com sucesso!";
        }
        mensagem.className = "mensagem sucesso";

        carregarProfessores();
    })
    .catch(function(erro) {
        console.error("Erro ao salvar professor:", erro);
        mensagem.textContent = "Não foi possível salvar o professor. Verifique se a API está disponível e tente novamente.";
        mensagem.className = "mensagem erro";
    });

});

carregarProfessores();