const express = require("express");
const bcrypt = require("bcrypt");
//const authenticateToken = require("../../middleware/auth");
const Usuario = require("../../models/usuarios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, score } = req.body;
    console.log("score do quiz", score)
    console.log("email",email)

    if (!score) {
      return res.status(400).json({ message: "Nenhuma pontuação enviada!" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const pontuacaoAtual = usuario.pontuacao;
    console.log("Pontuação no banco:", pontuacaoAtual)
    
    if (!pontuacaoAtual || score > pontuacaoAtual) {
      await usuario.update({ pontuacao: score });
      console.log("Pontuação atualizada.");
    }
    
    res.status(200).json({
      message: "Pontuação salva com sucesso",
      usuario: usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar a pontuação" });
  }
});


router.get("/", async (req, res) => {
  
  try {
    const pontuacoes = await Usuario.findAll({
      attributes: ["nome", "pontuacao", "email"]
    })

  //console.log(pontuacoes)

  res.status(200).send(pontuacoes)
    
  } catch (error) {
    console.log("Erro ao puxar as pontuações")
    res.status(400).send({error: error})
  }
});

module.exports = router;
