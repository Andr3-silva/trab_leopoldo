window.toggleNavbar = function() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('show');
};
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const email = sessionStorage.getItem("email");
    
    if (email) {
        // Se o usuário estiver logado, esconde os botões de login e cadastro
        document.getElementById('login_btn').style.display = 'none';
        document.getElementById('register_btn').style.display = 'none';
        
        // Exibe o botão de jogar
        document.getElementById('play_btn').style.display = 'inline-block';
    } else {
        // Se o usuário não estiver logado, garante que os botões de login e cadastro apareçam
        document.getElementById('login_btn').style.display = 'inline-block';
        document.getElementById('register_btn').style.display = 'inline-block';
        document.getElementById('play_btn').style.display = 'none';
    }
});
