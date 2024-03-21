const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsection",
    },
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
