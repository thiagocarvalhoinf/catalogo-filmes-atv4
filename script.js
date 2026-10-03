// base cad-a7k9
// aluno: ____________________

const formulario = document.getElementById("formulario");
const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const ano = document.getElementById("ano");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const mensagem = document.getElementById("mensagem");
const limpar = document.getElementById("limpar");

// Na primeira visita, o array começa vazio.
let registros = [];
const dadosSalvos = localStorage.getItem("catalogoFilmes");

if (dadosSalvos !== null) {
    registros = JSON.parse(dadosSalvos);
}

function salvarRegistros() {
    // O localStorage recebe texto, por isso convertemos o array para JSON.
    localStorage.setItem("catalogoFilmes", JSON.stringify(registros));
}

function mostrarFilmes() {
    lista.textContent = "";
    total.textContent = "Total de filmes: " + registros.length;

    if (registros.length === 0) {
        const vazio = document.createElement("li");
        vazio.className = "vazio";
        const aviso = document.createElement("strong");
        aviso.textContent = "Sua próxima sessão começa aqui";
        const dica = document.createElement("span");
        dica.textContent = "Adicione seu primeiro filme usando o formulário.";
        vazio.appendChild(aviso);
        vazio.appendChild(dica);
        lista.appendChild(vazio);
    }

    // Cada objeto do array vira um item da lista no DOM.
    for (const filme of registros) {
        const item = document.createElement("li");
        const icone = document.createElement("span");
        icone.className = "filme-icone";
        icone.textContent = "▶";
        icone.setAttribute("aria-hidden", "true");

        const detalhes = document.createElement("div");
        detalhes.className = "filme-detalhes";
        const nome = document.createElement("span");
        nome.className = "filme-titulo";
        nome.textContent = filme.titulo;
        const info = document.createElement("span");
        info.className = "filme-info";
        info.textContent = filme.genero + " · " + filme.ano;

        detalhes.appendChild(nome);
        detalhes.appendChild(info);
        item.appendChild(icone);
        item.appendChild(detalhes);
        lista.appendChild(item);
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (titulo.value.trim() === "") {
        mensagem.textContent = "Digite o título do filme.";
        titulo.focus();
        return;
    }

    // Os valores do formulário formam um objeto.
    const filme = {
        titulo: titulo.value.trim(),
        genero: genero.value,
        ano: Number(ano.value)
    };

    registros.push(filme);
    salvarRegistros();
    mostrarFilmes();
    formulario.reset();
    mensagem.textContent = "Filme cadastrado!";
    titulo.focus();
});

limpar.addEventListener("click", function () {
    if (confirm("Deseja apagar todos os filmes cadastrados?")) {
        registros = [];
        salvarRegistros();
        mostrarFilmes();
        mensagem.textContent = "Registros apagados.";
    }
});

// Exibe os dados recuperados quando a página abre ou é recarregada.
mostrarFilmes();
