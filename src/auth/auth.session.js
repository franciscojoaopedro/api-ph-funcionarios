const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Funcionario = require('../models/Funcionario');

const login = async (req, res) => {
  try {
    const {email,senha}=req.body
    // Encontrar o usuário pelo e-mail
    const user = await Funcionario.findOne({ email:email });
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    // Comparar a senha fornecida com a senha hash armazenada
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).send('Senha inválida');
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
};

module.exports = { login };