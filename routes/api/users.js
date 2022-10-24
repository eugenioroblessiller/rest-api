const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../../controllers/users')
const { check } = require('express-validator');
const Rol = require('../../models/rol')
const validateUser = require('../../middlewares/userValidator');
const router = require('express').Router()

// Get all users
router.get('/', getUsuarios)

// Get one user
router.get('/:id', getUsuario)

// Create a user
router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password at least 6 characters').notEmpty().isLength({ min: 6 }),
        // check('rol', 'This is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(async (rol = '') => {
            console.log({ rol })
            const rolExist = await Rol.findOne({ rol })
            console.log(rolExist)
            if (!rolExist) {
                throw new Error(`This ${rol} is not register in DB`)
            }
        }),
        validateUser
    ],
    createUsuario)

// Update a user
router.put('/:id', updateUsuario)

// Delete a user
router.delete('/:id', deleteUsuario)

module.exports = router