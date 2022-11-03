
const getProducts = (req, res = response) => {
    return res.status(200).json({
        message: 'Products is working'
    })
}

const getProduct = (req, res) => {

}

const createProduct = (req, res) => {

}

const updateProduct = (req, res) => {

}

const deleteProduct = (req, res) => {

}


module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }