const { check } = require('express-validator');
const { getProducts } = require('../../controllers/products');

const validateFields = require('../../middlewares/userValidator');

const router = require('express').Router()

router.get('/', getProducts)

module.exports = router