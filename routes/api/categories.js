const { check } = require('express-validator');
const { getCategories } = require('../../controllers/categories');

const validateFields = require('../../middlewares/userValidator');

const router = require('express').Router()

router.get('/', getCategories)



module.exports = router