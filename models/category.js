const mongoose = require('mongoose');
const { Schema } = mongoose;


const categorySchema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

categorySchema.methods.toJSON = function () {
    const { __v, state, _id, ...category } = this.toObject()
    category.id = _id
    return category
}

module.exports = mongoose.model('Category', categorySchema)