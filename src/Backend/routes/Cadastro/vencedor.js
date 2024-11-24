const express = require("express");
const Usuario = require("../../models/usuarios");

const router = express.Router();

// Rota para obter o perfil do usuário
router.get("/", async (req, res) => {
  try {
    // Recuperar o email do usuário a partir dos parâmetros de consulta (query params)
    const { email } = req.query;
    console.log(email);
    if (!email) {
      return res.status(400).json({ message: "Email não fornecido." });
    }

    // Buscar o usuário no banco de dados com base no email
    const usuario = await Usuario.findOne({
      where: { email: email },
      attributes: ["nome", "email", "pontuacao"], // Selecionar apenas os campos desejados
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Retornar as informações do usuário
    res.status(200).json({
      nome: usuario.nome,
      email: usuario.email,
      pontuacao: usuario.pontuacao,
    });
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
    res.status(500).json({ message: "Erro ao processar solicitação." });
  }
});

module.exports = router;