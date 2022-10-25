const mongoose = require('mongoose');
const { Schema } = mongoose;

const rolSchema = new Schema({
    rol: {
        type: String,
        required: [true, "Rol is required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Rol', rolSchema)