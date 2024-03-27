const { default: mongoose } = require("mongoose");
const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const { imageUploader } = require("../utils/imageUploader");
const Course = require("../models/course");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, gender, contactNumber, about } = req.body;
    const userId = req.user._id;
    // if (!contactNumber || !about) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Both fields are required",
    //   });
    // }
    const userDetails = await User.findOne({ _id: userId });
    const updatedProfile = await Profile.findByIdAndUpdate(
      { _id: userDetails.aditionalDetails },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.deletedAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    await Profile.findByIdAndDelete({ _id: findUser.aditionalDetails });
    await User.findByIdAndDelete({ _id: userId });
    // unenroll the user form all the enrolled courses then deleted the user
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getProfileDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    var id = new mongoose.Types.ObjectId(userId);
    const userDetails = await User.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "aditionalDetails",
          foreignField: "_id",
          as: "aditionalDetails",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "user details fetch successfully",
      data: userDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    console.log(req.files);
    const { profilePicture } = req.files;
    const userId = req.user._id;
    const link = await imageUploader(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          image: link?.secure_url,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile Picture updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.instuctorDashboard = async (req, res) => {
  try {
    const allCourses = await Course.find({ instructor: req.user._id });
    const addSomeOnCourse = allCourses?.map((course) => {
      const totalStudent = 0;
      const totalAmount = 0;
      const details = {
        course: course,
        totalStudent: course?.studentJoined?.length,
        totalAmount: totalStudent * course?.price,
      };
      return details;
    });
    const totalAmountOfInstructor = addSomeOnCourse?.reduce(
      (acc, curr) => acc + curr?.totalAmount,
      0
    );
    const totalStudentOfInstructor = addSomeOnCourse?.reduce(
      (acc, curr) => acc + curr?.totalStudent,
      0
    );
    res.status(200).json({
      success: true,
      data: {
        course:addSomeOnCourse,
      totalAmountOfInstructor,
      totalStudentOfInstructor,
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
