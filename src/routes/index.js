const express = require('express');
const FuncionarioController = require('../controllers/FuncionarioController');
const router = express.Router();
const upload = require('../middlewares/upload');
const DocumentoController = require('../controllers/DocumentoController');

router.post('/funcionarios',FuncionarioController.verificarDominioNoEmail, FuncionarioController.store);
router.get('/funcionarios', FuncionarioController.get_funcionario);
router.get('/funcionario/:id', FuncionarioController.get_Ony_funcionario);

router.post('/funcionarios/:funcionarioId/foto', upload.single('foto'), FuncionarioController.uploadFoto);
router.post('/funcionarios/:funcionarioId/documentos', upload.single('documento'), DocumentoController.uploadDocumento);


module.exports = router;