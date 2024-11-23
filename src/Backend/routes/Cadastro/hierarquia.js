const express = require("express");
const authenticateToken = require("../../middleware/auth");
const Usuario = require("../../models/usuarios");

const router = express.Router();

router.put("/hierarquia/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    // Encontrar o usuário a ser atualizado
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Atualizar o campo 'hierarquia'
    usuario.hierarquia = 1;
    await usuario.save();

    res.status(200).json({
      message: "Hierarquia atualizada com sucesso.",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        hierarquia: usuario.hierarquia,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar hierarquia:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao atualizar hierarquia." });
  }
});

module.exports = router;
