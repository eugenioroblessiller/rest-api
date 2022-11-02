const bcryptjs = require("bcryptjs");
const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { generateJsonWebToken } = require("../helpers/generateJsonWebToken");
const User = require("../models/user");


const loginUser = async (req, res = response) => {
    const { email, password } = req.body

    try {
        // check if email exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: `User with email: ${email} was not found`
            })
        }
        // Check if user is active
        if (user.status == false) {
            return res.status(500).json({
                message: `User with email: ${email} not longer belongs to the system`
            })
        }
        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(500).json({
                message: `Password is not correct`
            })
        }

        // Generate JWT
        const token = await generateJsonWebToken(user.id)

        return res.status(200).json({
            message: "Very very good",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, call the admin",
        })
    }
}

module.exports = { loginUser }