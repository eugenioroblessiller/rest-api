const { check } = require('express-validator');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../../controllers/categories');

const validateFields = require('../../middlewares/userValidator');
const { validateJWT } = require('../../middlewares/validateJWT');

const router = require('express').Router()

router.get('/', getCategories)

router.get('/:id', getCategory)

router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)


module.exports = router