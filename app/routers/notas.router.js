let express = require('express');
let router = express.Router();

const notas = require('../controllers/notas.controller.js');

router.post('/api/notas/create', notas.create);
router.get('/api/notas/all', notas.retrieveAll);
router.get('/api/notas/onebyid/:id', notas.getById);
router.put('/api/notas/update/:id', notas.updateById);
router.delete('/api/notas/delete/:id', notas.deleteById);

module.exports = router;
