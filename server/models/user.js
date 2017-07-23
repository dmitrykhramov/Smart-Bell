const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });    
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;