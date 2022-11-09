const { body } = require("express-validator")
const Product = require("../models/product")

const getProducts = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [productCounts, products] = await Promise.all([
        Product.countDocuments(),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .limit(+limit)
            .skip(+from)
            .sort('createdAt')
    ])

    return res.status(200).json({
        message: 'Products is working',
        products,
        productCounts
    })
}

const getProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    if (!product) {
        return res.status(400).json({
            message: "Product was not found"
        })
    }

    return res.status(200).json({
        message: "Get Prodcut",
        category: product
    })
}

const createProduct = async (req, res) => {
    const name = req.body.name
    const { _id, ...rest } = req.body

    const productDB = await Product.findOne({ name })
    if (productDB) {
        return res.status(400).json({
            message: `Prodcut ${productDB.name} is already created`
        })
    }

    const data = {
        ...rest,
        name: req.body.name.toUpperCase(),
        user: req.user.id
    }

    const product = new Product(data)
    await product.save()

    return res.status(201).json({
        message: 'Prodcut is working - POST',
        product
    })
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { _id, state, user, ...rest } = req.body

    if (rest.name) {
        rest.name = rest.name.toUpperCase()
    }
    rest.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, rest, { new: true })
        .populate('user', 'name')
    res.status(200).json({ message: 'put product - controller', product })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    // Updating status for deleting pourpuses if user is ADMIN_ROLE
    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })
    res.status(200).json({ message: 'delete product', product })
}


module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }