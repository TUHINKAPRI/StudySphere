const crypto = require("crypto");
const Token = require("../models/token.model");
const mailsender = require("../utils/mailSender");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email",
      });
    }
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found please signup before login",
      });
    }
    

    //token create
    let findToken = await Token.findOne({ email });
    if (!findToken) {
      findToken = await Token.create({
        email,
        token: crypto.randomBytes(32).toString("hex"),
      });
    }
    console.log(findToken)
    //create link and send to the client
    const url = `http://localhost:3000/password-reset/${findToken.token}`;
    await mailsender(email, "Password reset link", url);
    res.status(200).json({
      success: true,
      message: "Password link send in your mail",
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Intternel server error",
    });
  }
};

//reset password

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, email } = req.body;
    const { token } = req.params;
    if (!email | !password | !confirmPassword | !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is not match please enter the correct password",
      });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const findToken = await Token({ email: email, token: token });
    if (!findToken) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }
    if (findToken.token !== token) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: findUser._id },
      { password: hashPassword },
      { new: true }
    );
    res.status(200).json({
      success: false,
      mesage: "Password updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
