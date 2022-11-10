const path = require('path')


const uploadFile = (req, res) => {
    console.log(req.files.file)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        });
    }

    const { file } = req.files

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const uploadPath = path.join(__dirname, '../uploads/', file.name);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({ err });

        res.status(200).json({
            message: 'File uploaded!'
        });
    });
}


module.exports = { uploadFile }