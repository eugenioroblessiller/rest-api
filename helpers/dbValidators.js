const Rol = require('../models/rol')
const User = require('../models/user')

/**
 * It checks if the role is valid.
 * @param [rol] - The role to be validated.
 */
const isRoleValid = async (rol = '') => {
    const rolExist = await Rol.findOne({ rol })
    if (!rolExist) {
        throw new Error(`This ${rol} is not register in DB`)
    }
}

/**
 * It checks if the email exists in the database
 * @param [email] - The email address to check.
 */
const emailExist = async (email = '') => {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        throw new Error(`This ${email} is register in DB`)
    }
}

const userExistById = async (id = '') => {
    const userExist = await User.findById(id)
    if (!userExist) {
        throw new Error(`This user by id ${id} is NOT register in DB`)
    }
}

module.exports = { isRoleValid, emailExist, userExistById }