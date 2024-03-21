const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razzorpay.connect");
const Course = require("../models/course");
const User = require("../models/user.model");
const crypto = require("crypto");
exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please select a course",
      });
    }
    const findCourse = await Course.findById(courseId);
    if (!findCourse) {
      res.status(400).json({
        success: false,
        message: "Please select a valid course",
      });
    }
    const uid = mongoose.Types.ObjectId(userId);
    const isExistUser = findCourse.studentJoined.includes(uid);
    if (!isExistUser) {
      return res.status(200).json({
        success: false,
        message: "User already purches this course",
      });
    }
    const amount = findCourse.price;
    const options = {
      amount: amount * 100,
      currency: "INR",
      notes: {
        userId: req.user._id,
        courseId: courseId,
      },
    };
    const response = await instance.orders.create(options);
    res.status.json({
      success: true,
      courseName: findCourse.name,
      courseDescription: findCourse.description,
      courseThumbnail: findCourse.thumbnail,
      orderId: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const receivedSignature = req.headers["x-razorpay-signature"];
    console.log(receivedSignature);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");
    console.log(expectedSignature);
    if (receivedSignature == expectedSignature) {
      console.log("payment authorized");
      const { userId, courseId } = req.body.payload.payment.entity.notes;
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentJoind: userId,
          },
        },
        { new: true }
      );
      if (!updatedCourse) {
        return res.status(400).json({
          success: false,
          message: "Somthing went wrong",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            courses: updatedCourse._id,
          },
        },
        { new: true }
      );
      //mail send
      const email = await mailsender(
        userId.email,
        "confirmmation mail",
        "successfully enrolled this course"
      );
      res.status(200).json({
        success: true,
        message: "Congratulation for successfully buying this course",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Payment secret is different ",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
