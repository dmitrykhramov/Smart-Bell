const Authentication = require('./controllers/authentication');
const ManageVisitors = require('./controllers/manage-visitors');
const passportService = require('./services/passport');
const passport = require('passport');
const request = require('request');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Smart doorbell innovation project'});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/add_visitor', ManageVisitors.addVisitor);
};
