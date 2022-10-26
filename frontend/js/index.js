import { urlApi } from "./config.js";

const linhas = document.querySelector(".linhas");
const addLinhaDiv = document.getElementById("add-linha-div");
const addLinhaBotao = document.getElementById("add-linha-btn");
const gerarGraficoBotao = document.getElementById("gerar-grafico");
const linhasColunasJSON = [];
let gerarGraficoTrava = false;

function removerLinha(e) {
    const linhaClicada = e.target.parentNode.parentNode;

    linhas.removeChild(linhaClicada);
}

function removerColuna(e) {
    const colunaClicada = e.target.parentNode.parentNode;
    const linha = colunaClicada.parentNode;

    linha.removeChild(colunaClicada);
}

function criarSeletorEixo() {
    const seletor = document.createElement("select");
    let firstOption = true;

    const options = [
        {
            value: "nomeFantasia",
            text: "Nome fantasia"
        },
        {
            value: "veiculoNome",
            text: "Veículo nome"
        },
        {
            value: "linhaNome",
            text: "Linha nome"
        },
        {
            value: "motoristaNome",
            text: "Motorista nome"
        },
        {
            value: "motoristaMatricula",
            text: "Motorista matrícula"
        },
        {
            value: "inercia",
            text: "Inércia"
        },
        {
            value: "rpmElevado",
            text: "RPM elevado"
        }
    ];

    options.forEach(current_option => {
        const option = document.createElement("option");

        option.value = current_option.value;
        option.innerHTML = current_option.text;

        if (firstOption) {
            option.selected = true;

            firstOption = false;
        }

        seletor.appendChild(option);
    });

    return seletor;
}

function criarSeletorGrafico() {
    const seletor = document.createElement("select");
    let firstOption = true;

    const options = [
        {
            value: "bar",
            text: "Barra"
        }
    ];

    options.forEach(current_option => {
        const option = document.createElement("option");

        option.value = current_option.value;
        option.innerHTML = current_option.text;

        if (firstOption) {
            option.selected = true;
            
            firstOption = false;
        }

        seletor.appendChild(option);
    });

    return seletor;
}

function criarColuna() {
    const coluna = document.createElement("div");
    const colunaHeader = document.createElement("div");
    const colunaContent = document.createElement("div");
    const botaoRemoverColuna = document.createElement("button");
    const divEixoX = document.createElement("div");
    const divEixoY = document.createElement("div");
    const divGrafico = document.createElement("div");
    const labelEixoX = document.createElement("label");
    const labelEixoY = document.createElement("label");
    const labelGrafico = document.createElement("label");
    const seletorEixoX = criarSeletorEixo();
    const seletorEixoY = criarSeletorEixo();
    const seletorGrafico = criarSeletorGrafico();

    coluna.className = "coluna";

    colunaHeader.className = "coluna-header";

    colunaContent.className = "coluna-content";

    botaoRemoverColuna.className = "error-btn"
    botaoRemoverColuna.innerHTML = "Remover coluna";
    botaoRemoverColuna.addEventListener("click", removerColuna);

    divGrafico.className = "seletor-div";
    divGrafico.setAttribute("dado", "grafico");
    
    divEixoX.className = "seletor-div";
    divEixoX.setAttribute("dado", "eixoX");

    divEixoY.className = "seletor-div";
    divEixoY.setAttribute("dado", "eixoY");

    labelEixoX.innerHTML = "Eixo X:";
    labelEixoY.innerHTML = "Eixo Y:";
    labelGrafico.innerHTML = "Tipo gráfico:";

    divEixoX.append(labelEixoX, seletorEixoX);
    divEixoY.append(labelEixoY, seletorEixoY);
    divGrafico.append(labelGrafico, seletorGrafico);

    colunaHeader.appendChild(botaoRemoverColuna);

    colunaContent.append(divGrafico, divEixoX, divEixoY);

    coluna.append(colunaHeader, colunaContent);

    return coluna;
}

function adicionarColuna(e) {
    const colunaBase = e.target.parentNode;
    const linhaContent = colunaBase.parentNode;

    const novaColuna = criarColuna();

    linhaContent.insertBefore(novaColuna, colunaBase);
}

function criarLinha() {
    const novaLinha = document.createElement("div");
    const linhaHeader = document.createElement("div");
    const removerLinhaBotao = document.createElement("button");
    const linhaContent = document.createElement("div");
    const coluna = document.createElement("div");
    const adicionarColunaBotao = document.createElement("button");

    linhaHeader.className = "linha-header";
    
    removerLinhaBotao.innerHTML = "Remover linha";
    removerLinhaBotao.className = "error-btn";
    removerLinhaBotao.addEventListener("click", removerLinha);

    linhaContent.className = "linha-content";

    coluna.className = "coluna";

    adicionarColunaBotao.innerHTML = "Adicionar coluna";
    adicionarColunaBotao.className = "confirm-btn";
    adicionarColunaBotao.addEventListener("click", adicionarColuna);

    novaLinha.className = "linha";

    linhaHeader.appendChild(removerLinhaBotao);

    linhaContent.appendChild(coluna);

    coluna.appendChild(adicionarColunaBotao);

    novaLinha.appendChild(linhaHeader);
    novaLinha.appendChild(linhaContent);

    return novaLinha;
}

addLinhaBotao.addEventListener("click", () => {
    const novaLinha = criarLinha();

    linhas.insertBefore(novaLinha, addLinhaDiv);
});

gerarGraficoBotao.addEventListener("click", async () => {
    const linhasGraficos = Array.from(linhas.childNodes).filter(linha => linha.nodeType === Node.ELEMENT_NODE && linha.id !== "add-linha-div");

    linhasGraficos.forEach(linha => {
        const linhaContent = linha.childNodes[1];

        const colunas = Array.from(linhaContent.childNodes).filter(coluna =>coluna.nodeType === Node.ELEMENT_NODE && coluna.firstChild.className === "coluna-header");

        const linhaAtual = {
            colunas: []
        }

        colunas.forEach(coluna => {
            const colunaContent = coluna.childNodes[1];

            const dadosColunaContent = colunaContent.childNodes;

            const grafico = Array.from(dadosColunaContent).filter(dado => dado.nodeType === Node.ELEMENT_NODE && dado.getAttribute("dado") === "grafico")[0];
            const eixoX = Array.from(dadosColunaContent).filter(dado => dado.nodeType === Node.ELEMENT_NODE && dado.getAttribute("dado") === "eixoX")[0];
            const eixoY = Array.from(dadosColunaContent).filter(dado => dado.nodeType === Node.ELEMENT_NODE && dado.getAttribute("dado") === "eixoY")[0];

            const graficoSelect = grafico.lastChild;
            const eixoXSelect = eixoX.lastChild;
            const eixoYSelect = eixoY.lastChild;

            const graficoSelectValue = graficoSelect.value;
            const eixoXSelectValue = eixoXSelect.value;
            const eixoYSelectValue = eixoYSelect.value;

            const colunaData = {
                grafico: graficoSelectValue,
                eixoX: eixoXSelectValue,
                eixoY: eixoYSelectValue
            }
            
            linhaAtual.colunas.push(colunaData);
        });

        linhasColunasJSON.push(linhaAtual);
    });

    const gerarGraficoResponse = await fetch(`${urlApi}/getChartData/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(linhasColunasJSON)
    });

    const gerarGraficoJSON = await gerarGraficoResponse.json();

    const base64Response = gerarGraficoJSON.base64;

    window.location = `./grafico.html?grafico=${base64Response}`;
});