const path = require('path')
const { v4: uuidv4 } = require('uuid');


const uploadFile = (req, res) => {
    console.log(req.files.file)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        });
    }

    const { file } = req.files
    const cutName = file.name.split('.')
    const extension = cutName[cutName.length - 1]

    // extentions allow
    const validExtencions = ['png', 'jpg', 'jpeg', 'gif']
    if (!validExtencions.includes(extension)) {
        return res.status(400).json({
            message: `This extention: ${extension} is not allow, extentions valid are: ${validExtencions}`
        })
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const tempFileName = `${uuidv4()}.${extension}`
    const uploadPath = path.join(__dirname, '../uploads/', tempFileName);

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