const { Schema, model } = require('mongoose');     // imports only Schema function from mongoose

const cartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    group: {
        type: String,
        required: false
    },
    shopped: {
        type: Boolean,
        required: false
    }
});

module.exports = model("Cart", cartSchema);