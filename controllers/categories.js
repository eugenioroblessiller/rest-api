const { response } = require("express")
const Category = require("../models/category")


const getCategories = (req, res = response) => {
    return res.status(200).json({
        message: 'Categories is working'
    })
}

const getCategory = (req, res) => {

}

const createCategory = async (req, res) => {

    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        return res.status(400).json({
            message: `Category ${categoryDB.name} is already created`
        })
    }

    const data = {
        name,
        user: req.user.id
    }

    const category = new Category(data)
    await category.save()

    return res.status(201).json({
        message: 'Categories is working - POST',
        category
    })
}

const updateCategory = (req, res) => {

}

const deleteCategory = (req, res) => {

}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory }