const multer  = require('multer');
const {Visitor} = require('../models/visitor');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: '../python/pics/upload',
    filename: function (req, file, cb) {
        cb(null, 'img0.jpg');
    }
});
const upload = multer({ storage: storage });

exports.photoUpload = function(req, res, next) {
    upload.single('file')(req, res, function (err) {
        if (err) {
            res.status(404).send("Server problem, try later");
        }
        res.status(200).send("Photo uploaded");
    });
};






