const { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../../controllers/users')

const router = require('express').Router()

// Get all users
router.get('/', getUsuarios)

// Get one user
router.get('/:id', getUsuario)

// Create a user
router.post('/', createUsuario)

// Update a user
router.put('/:id', updateUsuario)

// Delete a user
router.delete('/:id', deleteUsuario)

module.exports = router