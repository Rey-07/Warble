//npm init : package.json - This is a node project
//npm i express : expressJs package installation
const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());
//Connecting mongoDB to our node app
mongoose
  .connect(
    "mongodb+srv://rey07:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.o45xkui.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo!");
  });

// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
//API : GET type : / :return text "Hello world"
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
// Now we want to tell express that our server will run on localhost:3001
app.listen(port, () => {
  console.log("App is running on port " + port);
});
