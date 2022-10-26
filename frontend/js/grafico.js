const content = document.querySelector(".content");

function gerarColuna(linha, colunas) {
    colunas.forEach(coluna => {
        const novaColuna = document.createElement("div");

        novaColuna.className = "coluna"; 

        const { eixoX, eixoY, grafico } = coluna;

        const dadosGrafico = [
            {
                x: eixoX,
                y: eixoY,
                type: grafico
            }
        ];

        const layoutGrafico = {
            autoSize: false,
            width: 500,
            height: 200
        }

        var config = {
            responsive: true
        }

        Plotly.newPlot(novaColuna, dadosGrafico, layoutGrafico, config);

        linha.appendChild(novaColuna);
    });
}

function gerarLinha(linha, content) {
    const novaLinha = document.createElement("div");

    novaLinha.className = "linha";

    const colunas = linha.colunas;

    gerarColuna(novaLinha, colunas);

    content.appendChild(novaLinha);
}

window.addEventListener("load", async () => {
    const searchString = window.location.search;

    const searchParams = new URLSearchParams(searchString);

    if (searchParams.has("grafico")) {
        const base64 = searchParams.get("grafico");

        const decodedBase64 = atob(base64);

        const jsonGrafico = JSON.parse(decodedBase64);

        console.log(jsonGrafico);

        jsonGrafico.linhas.forEach(linha => gerarLinha(linha, content));
    } else {
        window.location = "./index.html";
    }
});