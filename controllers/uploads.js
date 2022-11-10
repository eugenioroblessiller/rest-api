const { uploadFileHelper } = require("../helpers/uploadFile");

const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        });
    }

    try {
        const completePath = await uploadFileHelper(req.files, ['pdf'], 'pdf')
        return res.json({
            completePath
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


module.exports = { uploadFile }