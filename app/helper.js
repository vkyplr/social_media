const User = require("../app/models/User.model");

//generating a hash
exports.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
exports.validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

// Login redirect
exports.loginRedirect = (req, res, next) => {
  req.session.user ? res.redirect("/home") : next();
};

// Check Login Session
exports.checkSession = (req, res, next) => {
  req.session.user ? next() : res.redirect("/login");
};

// Extract Creation Date from id
exports.getCreatedDate = id => {
  var obId = mongoose.Types.ObjectId(id);
  return obId.getTimestamp().toDateString();
};

// Extract Creation Time from id
exports.getCreatedTime = id => {
  var obId = mongoose.Types.ObjectId(id);
  return obId.getTimestamp().toLocaleTimeString();
};

exports.getUserData = id => {
  return User.findOne({ _id: id });
};
