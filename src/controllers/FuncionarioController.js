const  Funcionario  = require('../models/Funcionario');
const bycript=require("bcrypt")
module.exports = {
  async store(req, res) {
    const { nome, email, senha, cargo, data_expiracao_contrato, descricao_funcao, desempenho } = req.body;
    
    const senha_incripada=await bycript.hash(senha,12)

    const funcionario = await Funcionario.create({ nome, email, senha:senha_incripada, cargo, data_expiracao_contrato, descricao_funcao, desempenho });
    
    
    return res.json(funcionario);
  },
  async uploadFoto(req, res) {
    try {
      const { funcionarioId } = req.params;
      const { filename } = req.file;

      const funcionario = await Funcionario.findByIdAndUpdate(funcionarioId, { foto_perfil: filename }, { new: true });

      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async verInformacoes(req, res) {
    try {
      const { funcionarioId } = req.params;
      const funcionario = await Funcionario.findById(funcionarioId);

      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async atualizarDesempenho(req, res) {
    try {
      const { funcionarioId } = req.params;
      const { desempenho } = req.body;

      const funcionario = await Funcionario.findByIdAndUpdate(funcionarioId, { desempenho }, { new: true });

      Funcionario.aggregate()
      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
