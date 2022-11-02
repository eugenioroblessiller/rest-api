const { response, request } = require("express")
const jsonwebtoken = require("jsonwebtoken")
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            message: "There is no JWT "
        })
    }

    try {
        const { uid } = jsonwebtoken.verify(token, process.env.SECRETOPRIVATEKEY)
        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                message: "This user does not exist in database"
            })
        }

        if (!user.state) {
            return res.status(401).json({
                message: `The user has been gone for ages - state: ${user.state}`
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            message: "The token is no valid"
        })
    }
}

module.exports = { validateJWT }