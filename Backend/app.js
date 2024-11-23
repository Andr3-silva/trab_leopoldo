const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 3000;
const cadastro = require("./routes/Cadastro/cadastro");
const login = require("./routes/Cadastro/login");
const score = require("./routes/score/score")
const profile = require("./routes/Cadastro/profile");
app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5500', // Permitir frontend
  credentials: false,  // Permitir cookies e credenciais
}));

require("../Backend/config/db");

app.get("/", (req, res) => {});

app.use("/", cadastro);
app.use("/login", login);
app.use("/score", score);
app.use("/",profile);

app.listen(PORT, () => {
  console.log("Servidor Rodando na porta 3000");
});