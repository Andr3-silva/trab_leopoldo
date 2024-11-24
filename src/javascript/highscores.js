// document.addEventListener("DOMContentLoaded", () => {
//   fetchHighScores();
// });

// async function fetchHighScores() {
//   const email = localStorage.getItem("email")
//   try {
//     const response = await fetch(`http://localhost:3000/score?email=${email}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         //'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
//       },
//     });

//     const data = await response.json();
//     console.log(data)
//     //console.log(data);
//   } catch (error) {
//     console.log({error: error})
//   }
// }

// function displayHighScores(scores) {
//   const highscoresList = document.getElementById("highscores-list");
//   console.log("scores na outra função", scores)
//   // Filtrar pontuações válidas e ordenar
//   const validScores = scores.filter((player) => player.pontuacao !== null);
//   validScores.sort((a, b) => b.pontuacao - a.pontuacao);
  

//   // Selecionar o Top 5
//   const topFive = validScores.slice(0, 5);

//   topFive.forEach((player, index) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <span class="rank">${index + 1}º</span>
//       <span class="name">${player.nome}</span>
//       <span class="score">${player.pontuacao}</span>
//     `;
//     highscoresList.appendChild(li);
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM totalmente carregado.");
  fetchHighScores();
});

const email = localStorage.getItem("email")

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

  console.log("pontuação no highscore:", localStorage.getItem("scoreGame"))

  const lastScore = parseInt(localStorage.getItem("score"), 10);
  const lastScoreString = localStorage.getItem("scoreGame")
  console.log("lastScore localstorage", lastScore)
  
  const userEmail = localStorage.getItem("email");

  let isLastScoreInTopFive = false;

  topFive.forEach((player, index) => {
    const li = document.createElement("li");
    
    // Verificar se este jogador é o usuário atual e se a pontuação corresponde à última pontuação
    const isCurrentUser = (player.email === userEmail) && (player.pontuacao === lastScore);
    
    li.innerHTML = `
      <span class="rank">${index + 1}º</span>
      <span class="name">${player.nome}</span>
      <span class="score">${player.pontuacao}</span>
    `;
    
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
    const container = document.querySelector(".container");
    const lastScoreDiv = document.querySelector(".last-score");
    lastScoreDiv.innerHTML = `
      <h2>Sua Última Pontuação</h2>
      <p>Você marcou <strong>${lastScoreString}</strong> pontos!</p>
      <p>Infelizmente, sua pontuação não está no Top 5.</p>
    `;
  }
}

