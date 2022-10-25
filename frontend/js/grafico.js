const chartArea = document.getElementById("chart");

window.addEventListener("load", async () => {
    const searchString = window.location.search;

    const searchParams = new URLSearchParams(searchString);

    if (searchParams.has("grafico")) {
        const base64 = searchParams.get("grafico");

        const decodedBase64 = atob(base64);

        const jsonGrafico = JSON.parse(decodedBase64);

        const eixoX = jsonGrafico.dados.map(dado => dado.eixoX);
        const eixoY = jsonGrafico.dados.map(dado => dado.eixoY);

        Plotly.newPlot(chartArea, [
            {
                x: eixoX,
                y: eixoY,
                type: "bar"
            }
        ]);
    } else {
        window.location = "./index.html";
    }
});