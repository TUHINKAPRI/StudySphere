const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const RatingAndReview = require("../models/ratingAndReview.model");

exports.createRatingAndReview = async (req, res) => {
  try {
    const {rating, review } = req.body;
    const {courseId}=req.params;
    const userId = req.user._id;
    if (!courseId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const findCourse = await Course.findOne({ _id: courseId });
    if (!findCourse) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    const uid = mongoose.Types.ObjectId(userId);
    const isExistUser = findCourse.studentJoined.includes(uid);
    if (!isExistUser) {
      return res.status(400).json({
        success: false,
        message: "At first you purchse this course",
      });
    }
    const alreadyExistUser = await RatingAndReview.findOne({ user: userId });
    if (alreadyExistUser) {
      return res.status(400).json({
        success: false,
        message: "You already rate this course",
      });
    }
    const ratingdAndReview = await RatingAndReview.create({
      userId: userId,
      courseId: courseId,
      rating: rating,
      review: review,
    });
    const updateCourseDetails = await Course.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          ratingAndReview: ratingdAndReview._id,
        },
      },
      { new: true }
    );
    console.log(updateCourseDetails);
    res.status(200).json({
      success: true,
      message: "Successfully rate and review on this course",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    const { courseId } = req.params;
    const getAvgRating = await RatingAndReview.aggregate([
      {
        $match: { courseId: mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);
    console.log(getAvgRating);
    if (getAvgRating.length > 0) {
      return res.status(200).json({
        success: true,
        message: "AverageRating",
        avgRating: getAvgRating[0].averageRating,
      });
    }
    return res.status(200).json({
      success: true,
      message: "No rating till now",
      avgRating: 0,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// on the specific course
exports.getAllRatingOnACourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const allRatings = await RatingAndReview.aggregate([
      {
        $match: {
          courseId: mongoose.Types.ObjectId(courseId),
        },
      },
    ]);
    res.status(200).json({
      success: false,
      message: "Fetch all ratings and reviews",
      rating: allRatings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const getAllRating = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({ path: "userId" })
      .populate({
        path: "courseId",
        select: "name",
      });
    res.status(200).json({
      success: true,
      message: "Find all the ratinf and review",
      allRating: getAllRating,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};
