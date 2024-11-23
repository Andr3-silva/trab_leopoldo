document.addEventListener("DOMContentLoaded", () => {
  fetchHighScores();
});

async function fetchHighScores() {
  const email = localStorage.getItem("email")
  try {
    const response = await fetch(`http://localhost:3000/score?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
      },
    });

    console.log(response);
  } catch (error) {
    console.log({error: error})
  }
}

function displayHighScores(scores) {
  const highscoresList = document.getElementById("highscores-list");

  // Filtrar pontuações válidas e ordenar
  const validScores = scores.filter((player) => player.pontuacao !== null);
  validScores.sort((a, b) => b.pontuacao - a.pontuacao);

  // Selecionar o Top 5
  const topFive = validScores.slice(0, 5);

  topFive.forEach((player, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="rank">${index + 1}º</span>
      <span class="name">${player.nome}</span>
      <span class="score">${player.pontuacao}</span>
    `;
    highscoresList.appendChild(li);
  });
}
