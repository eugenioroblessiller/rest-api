const { response } = require("express")


const getCategories = (req, res = response) => {
    return res.status(200).json({
        message: 'Categories is working'
    })
}

const getCategory = (req, res) => {

}

const createCategory = (req, res) => {

}

const updateCategory = (req, res) => {

}

const deleteCategory = (req, res) => {

}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory }