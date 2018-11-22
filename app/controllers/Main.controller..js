const User = require("../models/User.model");
const Post = require("../models/Post.model");
const helper = require("../helper");
exports.register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      req.flash("message", "Email already Registered");
      req.flash("type", "error");
      res.redirect(req.header("Referer"));
    } else {
      let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        password: helper.generateHash(req.body.password)
      });
      user.save(err => {
        if (err) {
          req.flash("message", "User not Registered");
          req.flash("type", "error");
          res.redirect("/");
        }
        req.flash("message", "User Registered Successfully");
        req.flash("type", "success");
        res.redirect("/");
      });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      if (helper.validPassword(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect("/");
      } else {
        req.flash("message", "Password does not match");
        req.flash("type", "error");
        res.redirect(req.header("Referer"));
      }
    } else {
      req.flash("message", "Email not found. Please Register First");
      req.flash("type", "error");
      res.redirect(req.header("Referer"));
    }
  });
};

exports.home = (req, res) => {
  Post.find({}, (error, posts) => {
    data = [];
    posts.map(post => {
      let user = helper.getUserData(post.user_id);
      console.log(user);
      return;
      data.push({
        user_id: post.user_id,
        post_id: post._id,
        content: post.content,
        date: helper.getCreatedDate(post._id),
        time: helper.getCreatedTime(post._id)
      });
    });
    res.render("index", { page: "home", data: data });
  });
};

exports.updateProfile = (req, res) => {
  req.session.user.first_name = req.body.first_name;
  req.session.user.last_name = req.body.last_name;
  req.session.user.phone = req.body.phone;
  var update = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  };
  User.findByIdAndUpdate(req.body._id, { $set: update }, (err, result) => {
    if (err) {
      console.log(err);
    }
    req.flash("message", "Profile Updated Successfully.");
    req.flash("type", "success");
    res.redirect(req.header("Referer"));
  });
};

exports.updatePassword = (req, res) => {
  var newPass = helper.generateHash(req.body.password);
  req.session.user.password = newPass;
  User.findByIdAndUpdate(
    req.body._id,
    { $set: { password: newPass } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      req.flash("message", "Password Updated Successfully.");
      req.flash("type", "success");
      res.redirect(req.header("Referer"));
    }
  );
};

exports.savePost = (req, res) => {
  let post = new Post({
    user_id: req.session.user._id,
    content: req.body.content
  });
  post.save(err => {
    if (err) {
      req.flash("message", "Post not Saved");
      req.flash("type", "error");
      res.redirect("/");
    }
    req.flash("message", "Post Saved Successfully");
    req.flash("type", "success");
    res.redirect("/");
  });
};

exports.logout = (req, res) => {
  delete req.session.user;
  req.flash("message", "Logged out successfully.");
  req.flash("type", "success");
  res.redirect("/");
};
