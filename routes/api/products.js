const { check } = require('express-validator');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../../controllers/products');
const { productExistById, categoryExistById } = require('../../helpers/dbValidators');

const validateFields = require('../../middlewares/userValidator');
const { validateJWT } = require('../../middlewares/validateJWT');
const { isUserAdmin } = require('../../middlewares/validateUserIsAdmin');

const router = require('express').Router()

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], getProduct)

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Is not an valid id').isMongoId(),
    check('category').custom(categoryExistById),
    validateFields
], createProduct)

router.put('/:id', [
    validateJWT,
    check('category', 'Is not an valid id').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isUserAdmin,
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], deleteProduct)

module.exports = router