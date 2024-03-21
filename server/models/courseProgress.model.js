const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  completedVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subsection",
  },
});

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

module.exports = CourseProgress;
