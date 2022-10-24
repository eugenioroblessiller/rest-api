const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../../controllers/users')
const { check } = require('express-validator');
const { isRoleValid, emailExist, userExistById } = require('../../helpers/dbValidators');
const validateFields = require('../../middlewares/userValidator');
const router = require('express').Router()

// Get all users
router.get('/', getUsuarios)

// Get one user
router.get('/:id', [], getUsuario)

// Create a user
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Password at least 6 characters').notEmpty().isLength({ min: 6 }),
    // check('rol', 'This is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isRoleValid),
    validateFields
], createUsuario)

// Update a user
router.put('/:id', [
    check('id', 'Is not an valid id').isMongoId(),
    check('id').custom(userExistById),
    check('rol').custom(isRoleValid),
    validateFields
], updateUsuario)

// Delete a user
router.delete('/:id', deleteUsuario)

module.exports = router