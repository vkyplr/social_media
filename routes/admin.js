const adminRouter = require("express").Router();

adminRouter.get("/", (req, res) => res.send("Admin Login Page"));

module.exports = adminRouter;
