const { check } = require('express-validator');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../../controllers/categories');
const { categoryExistById } = require('../../helpers/dbValidators');

const validateFields = require('../../middlewares/userValidator');
const { validateJWT } = require('../../middlewares/validateJWT');

const router = require('express').Router()

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(categoryExistById),
    validateFields
], getCategory)

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory)

router.put('/:id', [
    validateJWT,
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(categoryExistById),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], updateCategory)

router.delete('/:id',[
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(categoryExistById),
    validateFields
], deleteCategory)


module.exports = router