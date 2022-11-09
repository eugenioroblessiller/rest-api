const Category = require('../models/category')
const Product = require('../models/product')
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

/**
 * It checks if a user exists in the database by their id
 * @param [id] - The id of the user you want to check.
 */
const userExistById = async (id = '') => {
    const userExist = await User.findById(id)
    if (!userExist) {
        throw new Error(`This user by id ${id} is NOT register in DB`)
    }
}

/**
 * It will throw an error if the category by id is not register in DB
 * @param [id] - The id of the category to be checked.
 */
const categoryExistById = async (id = '') => {
    const categoryExist = await Category.findById(id)
    if (!categoryExist) {
        throw new Error(`This category by id ${id} is NOT register in DB`)
    }
}

const productExistById = async (id = '') => {
    const productExist = await Product.findById(id)
    if (!productExist) {
        throw new Error(`This product by id ${id} is NOT register in DB`)
    }
}



module.exports = { isRoleValid, emailExist, userExistById, categoryExistById, productExistById }