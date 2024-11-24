document.addEventListener('DOMContentLoaded', function() {



   // Função para buscar dados do jogador no backend
   async function getPlayerData() {
       const email = localStorage.getItem("email");
       try {
           const response = await fetch(`http://localhost:3000/profile?email=${encodeURIComponent(email)}`, {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
               },
           }); // Certifique-se de que esta rota corresponde à configurada no backend
           
           const data = await response.json();
           
           // Atualizar o conteúdo dos elementos com os dados do jogador
           document.getElementById('winner-name').textContent = data.nome;  // 'nome' vindo do backend
           document.getElementById('winner-score').textContent = data.pontuacao; // 'pontuacao' vindo do backend
       } catch (error) {
           console.error('Erro ao buscar dados do jogador:', error);
       }
   }

   // Chamada da função para buscar os dados do jogador ao carregar a página
   getPlayerData();

   // Função para alternar a exibição da barra de navegação no celular
   window.toggleNavbar = function() {
       const navbarLinks = document.querySelector('.navbar-links');
       navbarLinks.classList.toggle('show');
   };
});
