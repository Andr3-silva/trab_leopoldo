const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const scoreForm = document.getElementById("scoreForm")
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 6;

// finalScore.innerText = mostRecentScore * 10;

// const score = {
//   score: mostRecentScore * 10,
//   name: username.value,
// };

// highScores.push(score);
// highScores.sort((a, b) => b.score - a.score);
// highScores.splice(8);
// localStorage.setItem("highScores", JSON.stringify(highScores));
// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });

scoreForm.addEventListener("submit", async function (event) {

  // Função para salvar a pontuação no backend
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  

  console.log("Maior pontuação:", highScores)
  // if (!token) {
  //   console.error("Usuário não está autenticado.");
  //   alert("Você precisa estar logado para salvar sua pontuação.");
  //   return;
  // }

  try {
    const response = await fetch("http://localhost:3000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        //'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
      },
      body: JSON.stringify({ email, highScores }),
    });

    console.log(response)

    if (!response) {
      const errorData = await response.json();
      console.error("Erro ao salvar a pontuação:", errorData.message);
      alert(
        "Houve um problema ao salvar sua pontuação. Por favor, tente novamente."
      );
    } else {
      console.log("Pontuação salva com sucesso!");
      alert("Sua pontuação foi salva com sucesso!");
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert(
      "Houve um problema ao salvar sua pontuação. Por favor, tente novamente."
    );
  }


})

