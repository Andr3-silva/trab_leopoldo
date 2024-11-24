document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM totalmente carregado.");
  fetchHighScores();
  displayLastScore(); // Chamar a função para exibir a última pontuação
});

const email = localStorage.getItem("email")
const lastScore = parseInt(localStorage.getItem("score"), 10);

function fetchHighScores() {
  fetch(`http://localhost:3000/score?email=${email}`) // Substitua pela sua rota real
    .then(response => {
      console.log("Resposta recebida do servidor:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Dados recebidos para high scores:", data);
      displayHighScores(data);
    })
    .catch((error) => {
      console.error('Erro ao buscar pontuações:', error);
    });
}

function displayHighScores(scores) {
  const highscoresList = document.getElementById("highscores-list");
  console.log("scores na outra função", scores);
  
  if (!highscoresList) {
    console.error("Elemento com ID 'highscores-list' não encontrado no DOM.");
    return;
  }

  // Filtrar pontuações válidas e ordenar
  const validScores = scores.filter((player) => player.pontuacao !== null);
  console.log("Pontuações válidas:", validScores);
  
  validScores.sort((a, b) => b.pontuacao - a.pontuacao);
  console.log("Pontuações ordenadas:", validScores);

  // Selecionar o Top 5
  const topFive = validScores.slice(0, 5);
  console.log("Top 5 pontuações:", topFive);

  const lastScore = parseInt(localStorage.getItem("score"), 10);
  console.log("LastScore", lastScore)
  const userEmail = localStorage.getItem("email");

  let isLastScoreInTopFive = false;

  topFive.forEach((player, index) => {
    const li = document.createElement("li");
    
    // Verificar se este jogador é o usuário atual e se a pontuação corresponde à última pontuação
    const isCurrentUser = (player.email === userEmail)
    
  
    li.innerHTML = `
      <span class="rank">${index + 1}º</span>
      <span class="name">${player.nome}</span>
      <span class="score">${player.pontuacao}</span>
    `;

    if (index === 0) {
      li.innerHTML += `<span class="top-icon">🏆</span>`;
    }
    
    if (isCurrentUser) {
      li.classList.add("current-user");
      li.innerHTML += `<span class="badge">Você!</span>`;
      isLastScoreInTopFive = true;
    }
    
    highscoresList.appendChild(li);
    console.log(`Adicionado: ${player.nome} - ${player.pontuacao}`);
  });

  // Se a última pontuação não está no Top 5, exibi-la separadamente
  if (!isLastScoreInTopFive && lastScore !== null) {
    const lastScoreDiv = document.querySelector(".last-score");
    lastScoreDiv.innerHTML = `
      <h2>Sua Última Pontuação</h2>
      <p>Você marcou <strong>${lastScore}</strong> pontos!</p>
    `;
  }
}

function displayLastScore() {
  const lastScoreText = document.getElementById("last-score-text");
  const lastScoreString = localStorage.getItem("score")

  if (lastScore !== null) {
    lastScoreText.textContent = `Você marcou ${lastScoreString} pontos!`;
  } else {
    lastScoreText.textContent = "Nenhuma pontuação recente encontrada.";
  }
}
