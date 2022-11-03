const { check } = require('express-validator');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../../controllers/categories');

const validateFields = require('../../middlewares/userValidator');

const router = require('express').Router()

router.get('/', getCategories)

router.get('/:id', getCategory)

router.post('/', createCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)


module.exports = router