const User = require("../models/user.model");
const Otp = require("../models/OTP");
const Profile = require("../models/profile.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status.json({
        message: "Email is required",
      });
    }
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists please login",
      });
    }
    const generateOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(generateOtp);
    const otpBody = await Otp.create({
      email,
      otp: generateOtp,
    });
    res.status(200).json({
      success: true,
      message: "OTP send Successfully",
      otpBody,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "OTP send Error",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    console.log(req.body)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !otp ||
      !accountType
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const findOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!findOtp) {
      return res.status(400).json({
        success: false,
        message: "Otp is not found",
      });
    }
    if (otp !== findOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({
      gender: null,
      about: null,
      contactNumber: null,
      dateOfBirth: null,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      accountType,
      password: hashPassword,
      aditionalDetails: profile._id,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    const { password: pass, ...rest } = newUser._doc;
    res.status(200).json({
      success: true,
      message: "User created is successfully",
      user: rest,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatched = await bcrypt.compare(password, findUser.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const payload = {
      _id: findUser._id,
      email: findUser.email,
      role: findUser.accountType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      // expiresIn: "15min",
    });
    findUser.token = token;
    const { password: pass, ...rest } = findUser._doc;
    res.cookie("token", token).status(200).json({
      success: true,
      token,
      user: rest,
      message: "User login successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
