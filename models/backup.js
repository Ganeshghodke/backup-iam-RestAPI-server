// Load required packages
var mongoose = require('mongoose');

// Define our backup history schema
var BackupHistorySchema   = new mongoose.Schema({
  historyId: String,
  path: String,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Backup', BackupHistorySchema);
