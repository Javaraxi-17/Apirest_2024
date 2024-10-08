let express = require('express');
let router = express.Router();

const libros = require('../controllers/libro.controller.js');

router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAll);
router.get('/api/libros/:id', libros.getById);
router.put('/api/libros/update/:id', libros.updateById);
router.delete('/api/libros/delete/:id', libros.deleteById);

module.exports = router;
