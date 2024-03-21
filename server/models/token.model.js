const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  token: {
    type: String,
    reruired: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
