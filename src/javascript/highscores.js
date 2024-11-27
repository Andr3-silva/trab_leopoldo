document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM totalmente carregado.");
  fetchHighScores();
  displayLastScore();
});

const email = sessionStorage.getItem("email");
const lastScore = parseInt(sessionStorage.getItem("score"), 10);

function fetchHighScores() {
  fetch(`http://localhost:3000/score?email=${email}`)
    .then((response) => {
      console.log("Resposta recebida do servidor:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados recebidos para high scores:", data);
      displayHighScores(data);
    })
    .catch((error) => {
      console.error("Erro ao buscar pontuações:", error);
    });
}

function displayHighScores(scores) {
  const highscoresList = document.getElementById("highscores-list");
  console.log("scores recebidos:", scores);

  if (!highscoresList) {
    console.error("Elemento com ID 'highscores-list' não encontrado no DOM.");
    return;
  }

  // Ordena por pontuacaoMax em ordem decrescente
  scores.sort((a, b) => b.pontuacaoMax - a.pontuacaoMax);

  // Seleciona o Top 5
  const topFive = scores.slice(0, 5);
  console.log("Top 5 pontuações:", topFive);

  const userEmail = sessionStorage.getItem("email");

  let isLastScoreInTopFive = false;

  highscoresList.innerHTML = ""; // Limpa a lista antes de atualizar

  topFive.forEach((player, index) => {
    const li = document.createElement("li");

    // Verifica se este jogador é o usuário atual
    const isCurrentUser = player.email === userEmail;

    li.innerHTML = `
      <span class="rank">${index + 1}º</span>
      <span class="name">${player.nome}</span>
      <span class="score">${player.pontuacaoMax}</span>
    `;

    if (index === 0) {
      li.innerHTML += `<span class="top-icon">🏆</span>`;
    }

    if (isCurrentUser) {
      li.classList.add("current-user");
      isLastScoreInTopFive = true;
    }

    highscoresList.appendChild(li);
    console.log(`Adicionado ao Top 5: ${player.nome} - ${player.pontuacaoMax}`);
  });

  // Exibe mensagem para a última pontuação do usuário
  const lastScoreDiv = document.querySelector(".last-score");

  if (!isLastScoreInTopFive) {
    if (lastScore) {
      lastScoreDiv.innerHTML = `
        <h2>Sua Última Pontuação</h2>
        <p>Você marcou <strong>${lastScore}</strong> pontos!</p>
      `;
    } else {
      lastScoreDiv.innerHTML = `
        <h2>Jogue para bater essas pontuações!</h2>
      `;
    }
  }
}

function displayLastScore() {
  const lastScoreText = document.getElementById("last-score-text");
  const lastScoreString = sessionStorage.getItem("score");

  if (lastScoreString !== null) {
    lastScoreText.textContent = `Você marcou ${lastScoreString} pontos!`;
  } else {
    lastScoreText.textContent = "Jogue para bater essas pontuações!";
  }
}
