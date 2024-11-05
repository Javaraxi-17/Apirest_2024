
let express = require('express');
let router = express.Router();

const proyectos = require('../controllers/proyecto.controller.js');

router.post('/api/proyectos', proyectos.create);
router.get('/api/proyectos', proyectos.retrieveAll);
router.get('/api/proyectos/:id', proyectos.getById);
router.put('/api/proyectos/:id', proyectos.updateById);
router.delete('/api/proyectos/:id', proyectos.deleteById);

module.exports = router;
