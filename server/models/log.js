const mongoose = require('mongoose');

var Log = mongoose.model('log', {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    time: {
		type: String
	}
});

module.exports = {Log};
