const mongoose = require("mongoose");
//Creating a model
// Creating a mongoose schema
const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String,
    default: "",
  },
  likedPlaylists: {
    type: String,
    default: "",
  },
  subscribedArtists: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
