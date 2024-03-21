const express = require("express");
const {
  signup,
  signin,
  sendOtp,
  changePassword,
} = require("../controllers/auth.controllers");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");
const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/change-password", changePassword);

userRouter.post("/reset-password-token", resetPasswordToken);
userRouter.post("/reset-password/:token", resetPassword);



module.exports=userRouter;