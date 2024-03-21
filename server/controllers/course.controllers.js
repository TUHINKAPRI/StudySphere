const Course = require("../models/course");
const User = require("../models/user.model");
const Category = require("../models/category.models");
const { imageUploader } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    const { name, description, whatWeWillLearn, price, tag, category } =
      req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !name ||
      !description ||
      !whatWeWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //Validation for category field
    const findCategory = await Category.findById(category);
    if (!findCategory) {
      return res.status(400).json({
        success: false,
        message: "Category doesn't exist",
      });
    }
    //Validation for instructor
    const findInstructor = await User.findById(req.user._id);
    if (!findInstructor) {
      return res.Status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //upload to cloudinary
    const upload = await imageUploader(thumbnail, process.env.FOLDER_NAME);
    const newCourse = await Course.create({
      name,
      description,
      instructor: findInstructor._id,
      whatWeWillLearn,
      category: findCategory._id,
      price,
      thumbnail: upload.secure_url,
      tag: tag,
    });
    //add this course into the instructor schema
    await User.findByIdAndUpdate(
      { _id: findInstructor._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    //add this course to the category also

    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({}).populate("instructor");
    res.status(200).josn({
      success: true,
      message: "Course fetch successfully",
      course,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: flase,
      message: err.message,
    });
  }
};
//single course
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "aditionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReview");
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Could find the course with this course id",
      });
    }

    res.status(200).json({
      success: true,
      message: "course fetch is successfully",
      course: courseDetails,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const findCourse=await Course.findByIdAndUpdate({_id:courseId},{
    //   $set:{}
    // })
    res.status(200).json({
      success: true,
      message: "Not ready right now",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
