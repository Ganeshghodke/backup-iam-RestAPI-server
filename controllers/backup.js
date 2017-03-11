var Backup = require('../models/backup');

// Create endpoint /api/backups for POST
exports.postBackups = function(req, res) {
  var backup = new Backup();

  backup.historyId = req.body.historyId;
  backup.path = req.body.path;
  backup.userId = req.user._id;

  backup.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Backup history added successfully!', data: backup });
  });
};

// Create endpoint /api/backups for GET
exports.getBackups = function(req, res) {
  Backup.find({ userId: req.user._id }, function(err, backups) {
    if (err)
      return res.send(err);

    res.json({ "backups" : backups});
  });
};

// Create endpoint /api/backups/:backup_id for GET
exports.getBackup = function(req, res) {
  Backup.find({ userId: req.user._id, _id: req.params.backup_id }, function(err, backup) {
    if (err)
      return res.send(err);

    res.json(backup);
  });
};

// Create endpoint /api/backups/:backup_id for PUT
exports.putBackup = function(req, res) {
  Backup.update({ userId: req.user._id, _id: req.params.backup_id }, { path: req.body.path }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/backups/:backup_id for DELETE
exports.deleteBackup = function(req, res) {
  Backup.remove({ userId: req.user._id, _id: req.params.backup_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Backup removed now!' });
  });
};
