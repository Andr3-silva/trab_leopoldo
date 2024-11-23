const jwt = require("jsonwebtoken");

const SECRET_KEY = "andre"; // Mesma chave usada no login

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // Anexa as informações do usuário ao objeto da requisição
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = authenticateToken;
