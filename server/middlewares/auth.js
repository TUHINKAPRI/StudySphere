const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.cookies.token;
    if (!token) {
      return res.satatus(400).json({
        success: false,
        message: "Token is not provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong please login again  ",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  if (req.user.role !== "Student") {
    return res.status(400).json({
      success: false,
      message: "This is only the protected route for students only",
    });
  }
  next();
};

exports.isInstructor = async (req, res, next) => {
  if (req.user.role !== "Instructor") {
    return res.status(400).json({
      success: false,
      message: "This is protected route only for Instructor only",
    });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(400).json({
      success: false,
      message: "This routes only for Admin not for others",
    });
  }
  next();
};
