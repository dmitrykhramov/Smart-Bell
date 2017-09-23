const Authentication = require('./controllers/authentication');
const ManageVisitors = require('./controllers/manage-visitors');
const ManageLogs = require('./controllers/manage-logs');
const ManagePhoto = require('./controllers/manage-photo-upload');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/add_visitor', ManageVisitors.addVisitor);
    app.get('/visitors', ManageVisitors.getVisitors);
    app.delete('/delete/:id', ManageVisitors.deleteVisitor);
    app.patch('/toogle/:id/:value', ManageVisitors.toogleAccess);
    app.get('/logs', ManageLogs.getLogs);
    app.post('/logpost', ManageLogs.addLog);
    app.post('/photo', ManagePhoto.photoUpload);
};

