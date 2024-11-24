document.addEventListener('DOMContentLoaded', function() {

    // Função para buscar a maior pontuação
    async () => {
      try {
        const response = await fetch("http://localhost:3000/verificarHierarquia");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)

  
      } catch (error) {
        console.error("Erro ao buscar pontuações:", error);
      }
    }  
  });
  