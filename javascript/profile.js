document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar dados do jogador no backend
    async function getPlayerData() {
        try {
            const response = await fetch('/api/player/profile'); // Ajuste a rota conforme necessário
            const data = await response.json();

            document.getElementById('playerName').textContent = data.name;
            document.getElementById('playerEmail').textContent = data.email;
            document.getElementById('playerScore').textContent = data.score;
        } catch (error) {
            console.error('Erro ao buscar dados do jogador:', error);
        }
    }

    // Chamada da função
    getPlayerData();

    // Função para alternar a exibição da barra de navegação no celular
    window.toggleNavbar = function() {
        const navbarLinks = document.querySelector('.navbar-links');
        navbarLinks.classList.toggle('show');
    };
});
