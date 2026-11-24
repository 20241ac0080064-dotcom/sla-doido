const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pergunta = (texto) => new Promise((res) => rl.question(texto, res));

const valores = { A: 4, B: 3, C: 2, D: 1 };

async function main() {
  const conceitos = [];
  const frequencias = [];

  for (let tri = 1; tri <= 3; tri++) {
    let c;
    while (true) {
      c = (await pergunta(`Conceito do ${tri}º trimestre (A, B, C ou D): `))
        .trim()
        .toUpperCase();
      if (c in valores) break;
      console.log("Conceito inválido!");
    }

    let f;
    while (true) {
      f = parseFloat(await pergunta(`Frequência do ${tri}º trimestre (0-100): `));
      if (!isNaN(f) && f >= 0 && f <= 100) break;
      console.log("Frequência inválida!");
    }

    conceitos.push(valores[c]);
    frequencias.push(f);
  }

  rl.close();

  const soma = (arr) => arr.reduce((a, b) => a + b, 0);
  const mediaConceito = soma(conceitos) / 3;
  const mediaFreq = soma(frequencias) / 3;

  console.log(`\nMédia dos conceitos: ${mediaConceito.toFixed(2)}`);
  console.log(`Frequência média: ${mediaFreq.toFixed(1)}%`);

  if (mediaConceito >= 2 && mediaFreq >= 75) {
    console.log("Aluno APROVADO em LAEC.");
  } else {
    console.log("Aluno REPROVADO em LAEC.");
  }
}

main();


