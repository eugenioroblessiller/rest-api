const { request, response } = require("express");
const User = require("../models/user");
const { ObjectId } = require('mongoose').Types
const collections = ['users', 'categories', 'prodcuts', 'rols']


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

            break;
        case 'prodcuts':

            break;

        default:
            res.status(500).json({
                message: "No search is register"
            })
            break;
    }
}

module.exports = { search }