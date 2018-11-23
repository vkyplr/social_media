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
  let obId = mongoose.Types.ObjectId(id);
  let mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let obDate = new Date(obId.getTimestamp().toDateString());
  return (
    mlist[obDate.getMonth()] +
    " " +
    obDate.getDate() +
    ", " +
    obDate.getFullYear()
  );
};

// Extract Creation Time from id
exports.getCreatedTime = id => {
  var obId = mongoose.Types.ObjectId(id);
  return obId
    .getTimestamp()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

exports.getUserData = id => {
  User.findOne({ _id: id }, (err, result) => {
    global.user = result;
  });
  console.log(global.user);
};
