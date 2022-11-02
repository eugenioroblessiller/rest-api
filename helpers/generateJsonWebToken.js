const { response } = require("express")
const jsonwebtoken = require("jsonwebtoken")

const generateJsonWebToken = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jsonwebtoken.sign(payload, process.env.SECRETOPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.error(err)
                reject("Not possible to generate a token")
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = { generateJsonWebToken }