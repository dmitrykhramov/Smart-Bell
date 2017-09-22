const mongoose = require('mongoose');

var Visitor = mongoose.model('visitor', {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    access: {
        type: Boolean,
        default: true
    }
});

module.exports = {Visitor};