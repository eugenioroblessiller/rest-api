const { response } = require('express')

const getUsuarios = (req, res = response) => {
    res.status(200).json({ message: 'get users - controller' })
}

const getUsuario = (req, res = response) => {
    res.status(200).json({ message: 'get user - controller', id: req.params.id })
}

const createUsuario = (req, res = response) => {
    res.status(200).json({ message: 'post users - controller' })
}

const updateUsuario = (req, res = response) => {
    res.status(200).json({ message: 'put user - controller', id: req.params.id })
}

const deleteUsuario = (req, res) => {
    res.status(200).json({ message: 'delete users', id: req.params.id })
}


module.exports = { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario }
