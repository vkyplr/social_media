const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash-messages");
const app = express();
const server = require("http").createServer(app);
const sessionMiddleware = session({
  // cookie: { maxAge: 60000 },
  maxAge: new Date(Date.now() + 3600000), //1 Hour
  expires: new Date(Date.now() + 3600000), //1 Hour
  path: "/",
  secret: "woot",
  resave: false,
  saveUninitialized: false
});

bcrypt = require("bcrypt");

server.listen(4000, () => console.log("listning on PORT 4000"));
io = require("socket.io")(server);

// DATABASE INITIALIZATIONS
mongoose = require("mongoose");
objectId = mongoose.objectId;
schema = mongoose.Schema;
mongoose.connect(
  "mongodb://vikas:one2eight@ds163226.mlab.com:63226/nodejs",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Socket
io.sockets.on("connection", function(socket) {
  socket.on("message", function(msg) {
    io.emit("message", msg);
  });
});

// Routes
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");

app.use(sessionMiddleware);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist/")));
app.use(
  express.static(path.join(__dirname, "node_modules/jquery-validation/"))
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
app.use("/", mainRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.render("index", { page: "error" });
});
