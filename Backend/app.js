const express = require("express");
const app = express();
const PORT = 3000;
const cadastro = require("./routes/Cadastro/cadastro");
const login = require("./routes/Cadastro/login");

require("../Backend/config/db");

app.get("/", (req, res) => {});

app.use("/", cadastro);
app.use("/", login);
app.use("/score", score);

app.listen(PORT, () => {
  console.log("Servidor Rodando na porta 3000");
});
