const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, "Rol is required"],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject()
    user.id = _id
    return user
}
module.exports = mongoose.model('User', userSchema)