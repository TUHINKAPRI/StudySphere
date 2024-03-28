const express = require("express");
const {
  getAllCourses,
  createCourse,
  getCourseDetails,
  updateCourse,
  getInstructorCourse,
} = require("../controllers/course.controllers");
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
const {
  updateSection,
  createSections,
  deleteSection,
} = require("../controllers/section.controllers");
const {
  createSubSection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/subSection.controllers");
const {
  getAllRatingOnACourse,
  createRatingAndReview,
  getAvgRating,
} = require("../controllers/ratingAndReview.controllers");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/category.controllers");

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(getAllCourses)
  .post(auth, isInstructor, createCourse);
courseRouter
  .route("/getInstructorCourses")
  .get(auth, isInstructor, getInstructorCourse);
courseRouter
  .route("/getSingleCourse/:courseId")
  .get(getCourseDetails)
  .put(auth, isInstructor, updateCourse);
courseRouter
  .route("/:courseId/section")
  .post(auth, isInstructor, createSections);

courseRouter
  .route("/:courseId/section/:sectionId")
  .put(auth, isInstructor, updateSection)
  .delete(auth, isInstructor, deleteSection);

courseRouter
  .route("/:courseId/section/:sectionId/sub-section")
  .post(auth, isInstructor, createSubSection);
courseRouter
  .route("/:courseId/section/:sectionId/sub-section/:subsectionId")
  .put(auth, isInstructor, updateSubsection)
  .delete(auth, isInstructor, deleteSubsection);

courseRouter
  .route("/:courseId/review-rating")
  .post(auth, isStudent, createRatingAndReview)
  .get(getAllRatingOnACourse);

courseRouter.route("/create-category").post(auth, isAdmin, createCategory);
courseRouter.route("/getAllCategory").get(getAllCategories);

courseRouter.route("/:courseId/avg-review-rating").get(getAvgRating);

module.exports = courseRouter;
