const { request, response } = require("express");
const User = require("../models/user");
const Category = require("../models/category")
const Product = require("../models/product")


const { ObjectId } = require('mongoose').Types
const collections = ['users', 'categories', 'products', 'rols']


const searchUsers = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term)
    if (isMongoId) {
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    })
    return res.json({
        results: users
    })
}

const searchCategories = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term)
    if (isMongoId) {
        const category = await Category.findById(term)
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ state: true }]
    })
    return res.json({
        results: categories
    })
}

const searchProducts = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term)
    if (isMongoId) {
        const prodcut = await Product.findById(term).populate('category', 'name')
        return res.json({
            results: (prodcut) ? [prodcut] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const products = await Product.find({
        $or: [{ name: regex }],
        $and: [{ state: true }]
    }).populate('category', 'name')
    return res.json({
        results: products
    })
}

const search = (req = request, res = response) => {
    const { collection, term } = req.params

    if (!collections.includes(collection)) {
        return res.status(400).json({
            message: `The collection permited are ${collections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
            break;
        case 'categories':
            searchCategories(term, res)
            break;
        case 'products':
            searchProducts(term, res)
            break;

        default:
            res.status(500).json({
                message: "No search is register"
            })
            break;
    }
}

module.exports = { search }