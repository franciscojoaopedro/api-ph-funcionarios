const Documento = require("../models/Documento");
const Funcionario = require("../models/Funcionario");


module.exports={

    async uploadDocumento(req, res) {
        try {
          const { funcionarioId } = req.params;
          const { originalname: nome, filename: caminho } = req.file;
    
          const funcionario = await Funcionario.findById(funcionarioId);
          if (!funcionario) {
            return res.status(404).send({ error: 'Funcionário não encontrado' });
          }
    
          const documento = await Documento.create({
            nome,
            caminho,
            funcionarioId,
          });
    
          return res.json(documento);
        } catch (error) {
          return res.status(400).send(error);
        }
      }
}