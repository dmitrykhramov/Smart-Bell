const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
    firstname: String,
    lastname: String
});

const ModelClass = mongoose.model('visitor', visitorSchema);

module.exports = ModelClass;