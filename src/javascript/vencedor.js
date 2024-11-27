function logout() {
  // Remove o email do localStorage para deslogar o usuário
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("token");

  // Redireciona o usuário para a página inicial ou de login
  window.location.href = "home.html";
}

document.getElementById("logoutButton").addEventListener("click", logout);
const email = sessionStorage.getItem("email");

document.addEventListener("DOMContentLoaded", function () {
  window.toggleNavbar = function () {
    const navbarLinks = document.querySelector(".navbar-links");
    navbarLinks.classList.toggle("show");
  };

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
      console.log(data);

      document.getElementById("winner-name").textContent = data.nome;
      document.getElementById("winner-score").textContent = data.pontuacaoMax;

      const shareText = `Eu, ${data.nome}, atingi ${data.pontuacaoMax} pontos no jogo 'Quiz'! Será que você consegue me vencer?`;
      const shareUrl = "";

      const twitterShareButton = document.getElementById("twitterShareButton");
      twitterShareButton.onclick = function () {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank");
      };

      const whatsappShareButton = document.getElementById(
        "whatsappShareButton"
      );
      whatsappShareButton.onclick = function () {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        window.open(whatsappUrl, "_blank");
      };
    } catch (error) {
      console.error("Erro ao buscar dados do jogador:", error);
    }
  }

  getPlayerData();
});
