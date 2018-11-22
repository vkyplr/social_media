const MainController = require("../app/controllers/Main.controller.");
const router = require("express").Router();
const helper = require("../app/helper");

// GET Routes
router.get("/", helper.loginRedirect, (req, res) => {
  res.render("index", { page: "landing" });
});

router.get("/register", helper.loginRedirect, (req, res) =>
  res.render("index", { page: "register" })
);

router.get("/login", helper.loginRedirect, (req, res) => {
  res.render("index", { page: "login" });
});

router.get("/home", helper.checkSession, MainController.home);

router.get("/profile", helper.checkSession, (req, res) => {
  res.render("index", { page: "profile" });
});

router.get("/change-password", helper.checkSession, (req, res) =>
  res.render("index", { page: "change_password" })
);

router.get("/logout", MainController.logout);

// POST Routes
router.post("/register", MainController.register);
router.post("/login", MainController.login);
router.post(
  "/update-profile",
  helper.checkSession,
  MainController.updateProfile
);
router.post(
  "/change-password",
  helper.checkSession,
  MainController.updatePassword
);
router.post("/post", helper.checkSession, MainController.savePost);
module.exports = router;
