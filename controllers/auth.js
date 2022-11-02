const { response } = require("express");


const loginUser = (req, res = response) => {
    const body = req.body
    res.status(200).json({ 'message': 'login working', userData: body })
}

module.exports = { loginUser }