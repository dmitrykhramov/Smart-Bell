const {Log} = require('../models/log');

exports.addLog = function(req, res, next) {
    const firstname = "test name1";
    const lastname = "test name1";

    const log = new Log({
        firstname: firstname,
        lastname: lastname,
    });

    log.save(function(err) {
        if (err) { return next(err); }
        console.log(log);
        res.send("Log successfully added");
    });
};

exports.getLogs = function (req, res, next) {
    Log.find().sort({'_id': -1}).then((logs) => {
		console.log(logs);
        res.send({logs});
    }, (e) => {
        res.status(400).send(e);
    })
};

