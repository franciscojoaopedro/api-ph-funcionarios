const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obter o token do cabeçalho da requisição
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Um token é necessário para autenticação');
  }

  try {
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Substitua 'seuSecret' pelo seu segredo
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Token inválido');
  }

  return next();
};

module.exports = verificarToken;