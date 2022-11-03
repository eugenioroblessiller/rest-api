const { response } = require("express")


const getCategories = (req, res = response) => {
    return res.status(200).json({
        message: 'Categories is working'
    })
}


module.exports = { getCategories }