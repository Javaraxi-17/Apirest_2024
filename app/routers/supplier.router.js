let express = require('express');
let router = express.Router();

const suppliers = require('../controllers/supplier.controller.js');

router.post('/api/suppliers/create', suppliers.create);
router.get('/api/suppliers/all', suppliers.retrieveAll);
router.get('/api/suppliers/onebyid/:id', suppliers.getById);
router.put('/api/suppliers/update/:id', suppliers.updateById);
router.delete('/api/suppliers/delete/:id', suppliers.deleteById);

module.exports = router;
