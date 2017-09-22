const {Visitor} = require('../models/visitor');
const {ObjectID} = require('mongodb');

exports.addVisitor = function(req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    if (!firstname || !lastname || !email) {
        return res.status(422).send( {error: 'You must provide firstname, lastname and email'});
    }

    const visitor = new Visitor({
        firstname: firstname,
        lastname: lastname,
        email: email
    });

    visitor.save(function(err) {
        if (err) { return next(err); }
        res.status(200).send("Visitor successfully added");
    });
};

exports.getVisitors = function (req, res, next) {
    Visitor.find().sort({lastname: 1}).then((visitors) => {
        res.send({visitors});
    }, (e) => {
        res.status(400).send(e);
    })
};

exports.toogleAccess = function (req, res, next) {
    let id = req.params.id;
    let access = req.params.value;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Visitor.findByIdAndUpdate(id, {$set: {access: access}}).then((visitor) => {
        if (!visitor) {
            return res.status(404).send("Not valid id " + id);
        }
        res.status(200).send("Access changed");
    }).catch((e) => {
        res.status(400).send("Error while changing access");
    });
};

exports.deleteVisitor = function (req, res, next) {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Not valid id " + id);
    }

    Visitor.findByIdAndRemove(id).then((visitor) => {
        if (!visitor) {
            return res.status(404).send();
        }
        res.status(200).send("Visitor deleted");
    }).catch((e) => {
        res.status(400).send("Can not delete");
    });

};
