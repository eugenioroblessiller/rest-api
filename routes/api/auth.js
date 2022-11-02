
const { check } = require('express-validator');
const { loginUser } = require('../../controllers/auth');
const validateFields = require('../../middlewares/userValidator');
const router = require('express').Router()

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginUser)



module.exports = router