const path = require('path')
const fs = require('fs')

const User = require('../models/user');
const Product = require("../models/product")

const { uploadFileHelper } = require("../helpers/uploadFile");


const showImage = async (req, res) => {
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

    // Clean previus files
    try {
        console.log(model.img)
        if (model.img) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.img)
            if (fs.existsSync(pathImage)) {
                console.log('regresando imagen')
                res.sendFile(pathImage)
            }
        }
        res.json({
            message: "placeholder is missing"
        })
    } catch (error) {
        console.error(error)
    }
}



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

    // Clean previus files
    try {
        console.log(model)
        if (model.img) {
            // delete image from server
            const pathImage = path.join(__dirname, '../uploads', collection, model.img)
            console.log(pathImage)
            if (fs.existsSync(pathImage)) {
                console.log('entrando a borrar imagen', pathImage)
                fs.unlink(pathImage)
            }
        }
    } catch (error) {
        console.error(error)
    }

    const completePath = await uploadFileHelper(req.files, undefined, collection)
    console.log(completePath)
    model.img = completePath

    await model.save()

    return res.json({
        message: 'Hello world',
        model
    })
}


module.exports = { showImage, uploadFile, updateFile }