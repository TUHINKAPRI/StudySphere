const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeDuration: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const Subsection = mongoose.model("Subsection", subsectionSchema);

module.exports = Subsection;
