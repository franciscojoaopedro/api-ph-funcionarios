const mongoose = require('mongoose');

const DocumentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  caminho: { type: String, required: true },
  funcionarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario' },
});

module.exports = mongoose.model('Documento', DocumentoSchema);
