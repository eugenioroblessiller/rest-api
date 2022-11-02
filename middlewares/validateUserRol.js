const validateUserRol = (...rols) => {
    return (req, res, next) => {
        const { rol } = req.user
        if (!req.user) {
            res.status(500).json({
                message: "Attempt to validate the rol before validating the token"
            })
        }
        console.log('roles que llegan', rols, rol)
        if (!rols.includes(rol)) {
            return res.status(401).json({
                message: `the service requires one of this rols: ${rols}`
            })
        }

        next()
    }
}

module.exports = { validateUserRol }