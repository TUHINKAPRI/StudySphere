const mongoose = require("mongoose");
const mailsender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

otpSchema.pre("save", async function (next) {
  try {
    const response = await mailsender(
      this.email,
      "Your OTP is ",
      this.otp
    );
    console.log(`mail response ${response}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("Otp", otpSchema);
