const express = require("express");
const bcrypt = require("bcrypt");
const authenticateToken = require("../../middleware/auth");
const Usuario = require("../../models/usuarios");

const router = express.Router();

router.post("/cadastro", authenticateToken, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já está cadastrado." });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
});

module.exports = router;
