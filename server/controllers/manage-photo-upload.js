const multer  = require('multer');
const {Visitor} = require('../models/visitor');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './tmp',
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
        Visitor.findOne().sort({'_id': -1}).then(visitor => {
            let id = visitor._id;
            let source = fs.createReadStream('./tmp/img0.jpg');
            let dest = fs.createWriteStream("../python/pics/" + id + "/img0.jpg");
            source.pipe(dest);
            source.on('end', function() {
                res.status(200).send("Photo uploaded");
                console.log('replaced');
            });
            source.on('error', function(err) {
                res.status(404).send("Upload error");
                console.log('error');
            });
        });
    });
};






