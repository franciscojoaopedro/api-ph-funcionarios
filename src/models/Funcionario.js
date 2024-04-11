const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cargo: String,
  data_expiracao_contrato: Date,
  descricao_funcao: String,
  desempenho: String,
  foto_perfil: String, // URL da foto
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);