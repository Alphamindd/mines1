const campoMinado = document.getElementById("campoMinado");

const bombas = new Set();

while (bombas.size < 10) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    bombas.add(`${x},${y}`);
}

for (let i = 0; i < 100; i++) {
    let celula = document.createElement("div");
    celula.classList.add("celula");
    let x = i % 10;
    let y = Math.floor(i / 10);
    celula.dataset.x = x;
    celula.dataset.y = y;
    celula.onclick = () => revelarCelula(x, y);
    campoMinado.appendChild(celula);
}

function revelarCelula(x, y) {
    let celula = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (celula.classList.contains("selecionada")) {
        return;
    }
    celula.classList.add("selecionada");
    if (bombas.has(`${x},${y}`)) {
        celula.classList.add("bomba");
        alert("Você perdeu!");
    } else {
        let adjacentes = [
            [x-1, y-1], [x, y-1], [x+1, y-1],
            [x-1, y],             [x+1, y],
            [x-1, y+1], [x, y+1], [x+1, y+1]
        ];
        let adjacentesComBombas = adjacentes.filter(([x, y]) => bombas.has(`${x},${y}`));
        celula.textContent = adjacentesComBombas.length;
        if (adjacentesComBombas.length === 0) {
            adjacentes.forEach(([x, y]) => {
                if (x >= 0 && x < 10 && y >= 0 && y < 10) {
                    revelarCelula(x, y);
                }
            });
        }
        let todasSelecionadas = document.querySelectorAll(".celula.selecionada").length === 90;
        if (todasSelecionadas) {
            alert("Você ganhou!");
        }
    }
}
