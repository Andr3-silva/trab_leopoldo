// Função de Logout
function logout() {
  // Remover o email do localStorage para deslogar o usuário
  sessionStorage.removeItem("email");

  // Redirecionar o usuário para a página inicial ou de login
  window.location.href = "home.html"; // Mude "home.html" para a página de login se houver uma
}

// Vincular a função de logout ao botão
document.getElementById("logoutButton").addEventListener("click", logout);
const email = sessionStorage.getItem("email")

document.addEventListener("DOMContentLoaded", function () {
  // Função para verificar se o usuário tem a maior pontuação
  async function verificarPontuacao() {
    try {
      // Faz uma requisição para verificar se o usuário logado tem hierarquia 1
      const response = await fetch(
        `http://localhost:3000/verificarHierarquia/${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Data na tela tela profile.js via rota verificar hierarquia:", data)

      // Se o usuário tiver hierarquia 1, redireciona para a tela de vencedor
      if (data.isWinner) {
        window.location.href = "../pages/vencedor.html"; // Redireciona para a tela de vencedor
      }
    } catch (error) {
      console.error("Erro ao verificar hierarquia:", error);
    }
  }

  // Função para buscar e exibir os dados do jogador
  async function getPlayerData() {
    const email = sessionStorage.getItem("email");
    try {
      const response = await fetch(
        `http://localhost:3000/profile?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // Atualizar os elementos com o nome, email e pontuação do jogador
      document.getElementById("playerName").textContent = data.nome;
      document.getElementById("playerEmail").textContent = data.email;
      document.getElementById("playerScore").textContent = data.pontuacao;
    } catch (error) {
      console.error("Erro ao buscar dados do jogador:", error);
    }
  }

  // Chamar as funções ao carregar a página
  verificarPontuacao(); // Verifica se o usuário é o vencedor
  getPlayerData(); // Exibe os dados do usuário no perfil
});
