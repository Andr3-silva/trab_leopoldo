const express = require("express");
const app = express();
const path = require("path");
const cadastro = require("./routes/Cadastro/cadastro");
const login = require("./routes/Cadastro/login");

require("../Backend/config/db");

app.use(express.json());

app.get("/", (req, res) => {});

app.use("/", cadastro);
app.use("/", login);

app.listen(1000, () => {
  console.log("Servidor Rodando na porta 1000");
});
