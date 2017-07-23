const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    res.send( { token: tokenForUser(req.user), id: req.user._id });
};

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send( {error: 'You must provide email and password'});
    }

    // Check for existing user
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user exists return error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is already used '});
        }

        // If no user, create and save it to database
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) { return next(err); }
            console.log(user);

            // Respond the user was created
            res.json({ token: tokenForUser(user), id: user._id });
        });
    });
};