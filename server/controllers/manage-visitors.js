const Visitor = require('../models/visitor');

exports.addVisitor = function(req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!firstname || !lastname) {
        return res.status(422).send( {error: 'You must provide firstname and lastname'});
    }

    const visitor = new Visitor({
        firstname: firstname,
        lastname: lastname
    });

    visitor.save(function(err) {
        if (err) { return next(err); }
        console.log(visitor);
        res.send("Visitor successfully added");
    });
};