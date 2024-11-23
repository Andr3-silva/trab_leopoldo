document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar dados do jogador no backend
    async function getPlayerData() {
        try {
            const response = await fetch('http://localhost:3000/profile'); // Certifique-se de que esta rota corresponde à configurada no backend
            const data = await response.json();
            console.log(data)
            // Atualizar o conteúdo dos elementos com os dados do jogador
            document.getElementById('playerName').textContent = data.nome;  // 'nome' vindo do backend
            document.getElementById('playerEmail').textContent = data.email; // 'email' vindo do backend
            document.getElementById('playerScore').textContent = data.pontuacao; // 'pontuacao' vindo do backend
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
