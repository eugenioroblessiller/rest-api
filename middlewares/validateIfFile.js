const validateIfFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: 'No files were uploaded. - validateIfFile'
        });
    }

    next()
}

module.exports = { validateIfFile }