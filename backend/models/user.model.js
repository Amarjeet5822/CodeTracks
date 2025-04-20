const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, sparse: true },
  username: { type: String, required: true },
  avatarUrl: { type: String },
  email: { type: String, unique:true, sparse: true, required: false  },
  password: { type: String, default:"" },
  githubAccessToken: { type: String, select:false }
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password; // Remove password from the response
      return ret;
    },
  },
});

const User =  mongoose.model("User", UserSchema);
module.exports = User
