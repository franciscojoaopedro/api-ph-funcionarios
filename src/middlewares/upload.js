const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Verifica o tipo do arquivo para determinar a pasta de destino
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/fotos/');
    } else if (file.mimetype === 'application/pdf' || file.mimetype.includes('document')) {
      // Aqui você pode adicionar mais verificações para tipos de documentos específicos se necessário
      cb(null, 'uploads/documentos/');
    } else {
      // Caso o tipo do arquivo não seja suportado, você pode rejeitar o upload ou salvar em uma pasta padrão
      cb(new Error('Tipo de arquivo não suportado'), false);
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;