var MongoClient = require("mongoose");

var _db;

module.exports = {
  connectToServer: function(callback) {
    MongoClient.connect(
      "mongodb://vikas:one2eight@ds163226.mlab.com:63226/nodejs",
      (err, db) => {
        _db = db;
        return callback(err);
      }
    );
  },

  getDb: function() {
    return _db;
  },

  schema: MongoClient.Schema
};
