const { response } = require('express')
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { emailExist } = require('../helpers/dbValidators');
const user = require('../models/user');

const getUsuarios = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [userCounts, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(+limit)
            .skip(+from)
            .sort('createdAt')
    ])

    res.status(200).json({ userCounts, users })
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

    const user = await User.findByIdAndUpdate(id, rest, { new: true })
    console.log(user, 'usuario editado------->')
    res.status(200).json({ message: 'put user - controller', user })
}

const deleteUsuario = async (req, res) => {
    const { id } = req.params

    // Deleting a user from database
    // const user = await User.findByIdAndDelete(id)

    // Updating status for deleting pourpuses
    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true })
    res.status(200).json({ message: 'delete users', user })
}


module.exports = { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario }
