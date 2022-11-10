const User = require('../models/user');
const Product = require("../models/product")

const { uploadFileHelper } = require("../helpers/uploadFile");

const uploadFile = async (req, res) => {
    try {
        // const completePath = await uploadFileHelper(req.files, undefined, 'pdf')
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

const updateFile = async (req, res) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    message: `There is no user with the id: ${id}`
                })
            }
            break;

        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    message: `There is no product with the id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                message: 'Did not validate this'
            })
    }

    const completePath = await uploadFileHelper(req.files, undefined, collection)
    model.img = completePath

    await model.save()

    return res.json({
        message: 'Hello world',
        model
    })
}


module.exports = { uploadFile, updateFile }