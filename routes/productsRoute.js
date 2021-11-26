const router = require('express').Router();
const product = require('../controllers/productsController');
const upload = require("../middlewares/picture");

router.post('/product', upload("picture"), product.addProduct);
router.get('/product', product.getProducts);
router.get('/product/:id', product.getProductById);
router.delete('/product/:id', product.removeProduct);
router.put('/product/:id', upload("picture"), product.updateProduct);

module.exports = router;