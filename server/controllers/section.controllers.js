const Section = require("../models/section.modle");
const Course = require("../models/course");

exports.createSections = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const {courseId}=req.params
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const findCourse=await Course.findOne({_id:courseId})
    if(!findCourse){
      return res.status(404).json({
        success:false,
        message:'Course not found'
      })
    }
    const newSection = await Section.create({ sectionName });
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    //hw: populate both that is section and subsection also
    res.status(200).json({
      success: true,
      message: "Section created is successfully",
      updatedCourse,
    });
  } catch (err) {
    console.log(err)
    res.status(500).josn({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName} = req.body;
    const {sectionId}=req.params;
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { sectionName },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      updatedSection,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.params;

    const deletedSection = await Section.findByIdAndDelete(
      { _id: sectionId },
      { new: true }
    );
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          courses: sectionId,
        },
      },
      { new: true }
    );
    console.log(updatedCourse)

    res.status(200).josn({
      success: false,
      message: "Se3ction deleted successfully",
      deletedSection,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
