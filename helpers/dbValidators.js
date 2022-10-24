const Rol = require('../models/rol')


const isRoleValid = async (rol = '') => {
    const rolExist = await Rol.findOne({ rol })
    if (!rolExist) {
        throw new Error(`This ${rol} is not register in DB`)
    }
}

module.exports = { isRoleValid }