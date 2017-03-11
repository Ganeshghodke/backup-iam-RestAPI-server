// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var log = require('./libs/log')(module);
var config      = require('./libs/config');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var backupController = require('./controllers/backup');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var UserModel           = require('./models/user');

mongoose.connect(config.get('mongoose:uri'));

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /backups
router.route('/backups')
  .post(authController.isAuthenticated, backupController.postBackups)
  .get(authController.isAuthenticated, backupController.getBackups);

// Create endpoint handlers for /backups/:backup_id
router.route('/backups/:backup_id')
  .get(authController.isAuthenticated, backupController.getBackup)
  .put(authController.isAuthenticated, backupController.putBackup)
  .delete(authController.isAuthenticated, backupController.deleteBackup);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});
