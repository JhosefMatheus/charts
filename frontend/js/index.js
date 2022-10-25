import { urlApi } from "./config.js";

const eixoX = document.getElementById("eixo-x");
const eixoY = document.getElementById("eixo-y");
const gerarGraficoBotao = document.getElementById("gerar-grafico");

gerarGraficoBotao.addEventListener("click", async () => {
    const eixoXOpcao = eixoX.value;
    const eixoYOpcao = eixoY.value;

    const bodyData = {
        eixoX: eixoXOpcao,
        eixoY: eixoYOpcao
    }

    const gerarGraficoResponse = await fetch(`${urlApi}/getChartData/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
    });

    const gerarGraficoJSON = await gerarGraficoResponse.json();

    const base64Response = gerarGraficoJSON.base64;

    window.location = `./grafico.html?grafico=${base64Response}`;
});