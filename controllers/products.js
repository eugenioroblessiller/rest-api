
const getProducts = (req, res = response) => {
    return res.status(200).json({
        message: 'Products is working'
    })
}


module.exports = { getProducts }