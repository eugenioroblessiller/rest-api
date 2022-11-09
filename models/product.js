const mongoose = require('mongoose');
const { Schema } = mongoose;


const productoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,

    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

productoSchema.methods.toJSON = function () {
    const { __v, state, _id, ...product } = this.toObject()
    product.id = _id
    return product
}

module.exports = mongoose.model('Product', productoSchema)