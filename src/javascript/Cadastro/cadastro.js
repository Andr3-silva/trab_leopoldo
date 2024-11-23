document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    // Limpa mensagens de erro anteriores
    emailError.textContent = "";

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Por favor, insira um email válido.";
      event.preventDefault(); // Impede o envio do formulário
    }

    // Aqui você pode adicionar mais validações para nome e senha, se necessário.
  });
