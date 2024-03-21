const express = require("express");
const { isStudent, auth } = require("../middlewares/auth");
const {
  capturePayment,
  verifyPayment,
} = require("../controllers/payments.controllers");
const paymentRoutes = express.Router();

paymentRoutes.route("/capture-payments").post(auth, isStudent, capturePayment);
paymentRoutes.route("/verify-payments").post(auth, isStudent, verifyPayment);

module.exports = paymentRoutes;
