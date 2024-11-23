document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Limpa mensagens de erro anteriores
    emailError.textContent = "";

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    if (!emailRegex.test(email)) {
      emailError.textContent = "Por favor, insira um email válido.";
      return; // Impede a continuação da função
    }

    try {
      const response = await fetch("/login", {
        // Certifique-se de que esta é a rota correta
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        const { token, usuario } = data;

        // Salva o token e o email no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", usuario.email);

        // Redireciona para a página desejada após o login
        window.location.href = "#"; // Substitua pelo caminho correto
      } else {
        // Erro no login
        alert(data.message || "Erro ao fazer login. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(
        "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde."
      );
    }
  });
});
