let express = require('express');
let router = express.Router();

const curso = require('../controllers/curso.controller.js');

router.post('/api/cursos/create', curso.create);
router.get('/api/cursos/all', curso.retrieveAll);
router.get('/api/cursos/onebyid/:id', curso.getById);
router.put('/api/cursos/update/:id', curso.updateById);
router.delete('/api/cursos/delete/:id', curso.deleteById);

module.exports = router;
