document.addEventListener('DOMContentLoaded', function() {

    // Função para buscar a maior pontuação
    async function getTopScore() {
      try {
        const response = await fetch("http://localhost:3000/verificarHierarquia");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const scores = await response.json();
  
        // Filtrar pontuações válidas e encontrar a maior pontuação
        const validScores = scores.filter((player) => player.pontuacao !== null);
        validScores.sort((a, b) => b.pontuacao - a.pontuacao);
        return validScores[0].pontuacao; // Retorna a maior pontuação
  
      } catch (error) {
        console.error("Erro ao buscar pontuações:", error);
        return null;
      }
    }
  
    // Função para verificar se o jogador logado tem a maior pontuação
    async function checkIfTopScorer() {
      const playerScore = await getPlayerScore();
      const topScore = await getTopScore();
  
      if (playerScore !== null && topScore !== null && playerScore === topScore) {
        window.location.href = "../pages/vencedor.html";  // Redireciona para a tela de vencedor
      }
    }
  
    // Chama a função para verificar a pontuação ao carregar a página
    checkIfTopScorer();
  
  });
  