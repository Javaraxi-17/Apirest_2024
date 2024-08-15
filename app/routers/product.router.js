let express = require('express');
let router = express.Router();

const products = require('../controllers/product.controller.js');

router.post('/api/products/create', products.create);
router.get('/api/products/all', products.retrieveAll);
router.get('/api/products/onebyid/:id', products.getById);
router.put('/api/products/update/:id', products.updateById);
router.delete('/api/products/delete/:id', products.deleteById);

module.exports = router;
