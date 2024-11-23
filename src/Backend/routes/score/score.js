const express = require("express");
const bcrypt = require("bcrypt");
//const authenticateToken = require("../../middleware/auth");
const Usuario = require("../../models/usuarios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, score } = req.body;

    if (!score) {
      return res.status(400).json({ message: "Nenhuma pontuação enviada!" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const pontuacaoAtual = usuario.pontuacao;
    console.log("Pontuação atual do usuario:", pontuacaoAtual);

    if (!(pontuacaoAtual >= score)) {
      await usuario.update({ pontuacao: score });
      console.log("Pontuação atualizada.")
    }

    res.status(201).json({
      message: "Pontuação salva com sucesso",
      usuario: usuario,
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar a pontuação" });
  }
});

module.exports = router;
