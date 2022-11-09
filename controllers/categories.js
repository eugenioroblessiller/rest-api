const { response, request } = require("express")
const Category = require("../models/category")


const getCategories = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [categoryCounts, categories] = await Promise.all([
        Category.countDocuments(),
        Category.find(query)
            .populate('user', 'name')
            .limit(+limit)
            .skip(+from)
            .sort('createdAt')
    ])

    return res.status(200).json({
        message: 'Categories is working',
        categories,
        categoryCounts
    })
}

const getCategory = async (req = request, res = response) => {
    const id = req.params.id
    const category = await Category.findById(id)
        .populate('user', 'name')

    if (!category) {
        return res.status(400).json({
            message: "Category was not found"
        })
    }

    return res.status(200).json({
        message: "Get Category",
        category
    })
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

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { _id, state, user, ...rest } = req.body

    rest.name = rest.name.toUpperCase()
    rest.user = req.user._id

    const category = await Category.findByIdAndUpdate(id, rest, { new: true })
        .populate('user', 'name')
    res.status(200).json({ message: 'put category - controller', category })
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    // Updating status for deleting pourpuses if user is ADMIN_ROLE
    const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true })
    res.status(200).json({ message: 'delete category', category })
}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory }