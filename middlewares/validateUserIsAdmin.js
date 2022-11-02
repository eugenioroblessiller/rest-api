const { response, request } = require("express")


const isUserAdmin = (req = request, res = response, next) => {
    const { rol, name } = req.user

    if (!req.user) {
        res.status(500).json({
            message: "Attempt to validate the rol before validating the token"
        })
    }

    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            message: `User: ${name} is not authorized to continue`
        })
    }
    next()
}

module.exports = { isUserAdmin }