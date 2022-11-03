const { check } = require('express-validator');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../../controllers/products');

const validateFields = require('../../middlewares/userValidator');

const router = require('express').Router()

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router