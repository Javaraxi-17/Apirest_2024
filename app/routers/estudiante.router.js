let express = require('express');
let router = express.Router();

const estudiantes = require('../controllers/estudiante.controller.js');

router.post('/api/estudiantes/create', estudiantes.create);
router.get('/api/estudiantes/all', estudiantes.retrieveAll);
router.get('/api/estudiantes/onebyid/:id', estudiantes.getById);
router.put('/api/estudiantes/update/:id', estudiantes.updateById);
router.delete('/api/estudiantes/delete/:id', estudiantes.deleteById);

module.exports = router;
