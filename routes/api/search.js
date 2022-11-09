const { search } = require('../../controllers/search')
const validateFields = require('../../middlewares/userValidator')
const { validateJWT } = require('../../middlewares/validateJWT')


const router = require('express').Router()

router.get('/:collection/:term', [
    validateJWT,
    validateFields
], search)


module.exports = router