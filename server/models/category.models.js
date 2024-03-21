const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trimng: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
});

module.exports = mongoose.model("Category", categorySchema);
