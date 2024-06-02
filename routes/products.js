const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');
const auth = require('../middleware/auth');

router.post('/newProduct', productsCtrl.newProduct);
router.post('/newProductsList', productsCtrl.createProductsList);
router.get('/public', productsCtrl.getProductsList);
router.get('/admin', auth, productsCtrl.getAdminProductsList);
router.get('/:id', productsCtrl.getProductById);
router.put('/:id', productsCtrl.editProduct);
router.delete('/:id', auth, productsCtrl.deleteOneProduct);
router.delete('/', auth, productsCtrl.deleteSelectedProducts);

module.exports = router;
