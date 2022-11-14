const path = require('path')
const { v4: uuidv4 } = require('uuid');


const uploadFileHelper = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files
        const cutName = file.name.split('.')
        const extension = cutName[cutName.length - 1]

        // extentions allow
        if (!validExtension.includes(extension)) {
            return reject(`This extention: ${extension} is not allow, extentions valid are: ${validExtension}`)
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const tempFileName = `${uuidv4()}.${extension}`
        const uploadPath = path.join(__dirname, '../uploads/', directory, tempFileName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err)
                return reject(err)

            return resolve(tempFileName)
        });
    })
}

module.exports = { uploadFileHelper }