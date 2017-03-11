// Load required packages
var Client = require('../models/client');
var log = require('../libs/log')(module);

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.clientId = req.body.id;
  client.clientSecret = req.body.secret;
  client.userId = req.user._id;

  // Save the client and check for errors
  client.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Backup client Registered for a user!', data: client });
  });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      return res.send(err);

    log.info("Client GET : - %s", req.user._id);
    res.json({"clients" : clients});
  });
};
