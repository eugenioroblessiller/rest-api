const { response } = require('express')

const getUsuarios = (req, res = response) => {
    const query = req.query
    res.status(200).json({ message: 'get users - controller', query })
}

const getUsuario = (req, res = response) => {
    res.status(200).json({ message: 'get user - controller', id: req.params.id })
}

const createUsuario = (req, res = response) => {
    const body = req.body
    res.status(200).json({ message: 'post users - controller', user: body })
}

const updateUsuario = (req, res = response) => {
    res.status(200).json({ message: 'put user - controller', id: req.params.id })
}

const deleteUsuario = (req, res) => {
    res.status(200).json({ message: 'delete users', id: req.params.id })
}


module.exports = { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario }
