const { response } = require('express')
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { emailExist } = require('../helpers/dbValidators');

const getUsuarios = (req, res = response) => {
    const query = req.query
    res.status(200).json({ message: 'get users - controller', query })
}

const getUsuario = (req, res = response) => {
    res.status(200).json({ message: 'get user - controller', id: req.params.id })
}

const createUsuario = async (req, res = response) => {
    const { name, email, password, rol } = req.body
    const user = new User({ name, email, password, rol })

    // Encrypt 
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // Save to DB
    await user.save()
    res.status(200).json({ message: 'post users - controller', user })
}

const updateUsuario = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, ...rest } = req.body

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)
    res.status(200).json({ message: 'put user - controller', user })
}

const deleteUsuario = (req, res) => {
    res.status(200).json({ message: 'delete users', id: req.params.id })
}


module.exports = { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario }
