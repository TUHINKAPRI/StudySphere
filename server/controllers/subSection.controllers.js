const Subsection = require("../models/subsection.model");
const Section = require("../models/section.modle");
const { imageUploader } = require("../utils/imageUploader");
const Course = require("../models/course");

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration} = req.body;
    const {sectionId,courseId}=req.params
    const { videoUrl } = req.files;
    console.log(videoUrl)
    if (!title || !description || !timeDuration || !sectionId || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const findSection=await Section.findOne({_id:sectionId});
    if(!findSection){
      return res.status(404).json({
        success:false,
        message:'Section not found'
      })
    }
    const response = await imageUploader(videoUrl);
    const newsubSection = await Subsection.create({
      title,
      description,
      timeDuration,
      videoUrl: response.secure_url,
    });
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newsubSection._id,
        },
      },
      { new: true }
    );
    const updateCourse=await Course.findByIdAndUpdate(
      {
        _id:courseId
      },{
        $set:{
          status:"inactive"
        }
      },{
        new:true
      }
    )
    res.status(200).json({
      success: true,
      message: "subSection created is successfully",
      newsubSection,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { title, description, timeDuration } = req.body;
    const {subsectionId}=req.params
    const { videoFile } = req.files;
    if (!title || !description || !timeDuration || !sectionId || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const response = await imageUploader(videoFile, process.env.FOLDER_NAME);
    const updatedSubSection = await Subsection.findByIdAndUpdate(
      { _id: subsectionId },
      {
        $set: {
          title,
          description,
          timeDuration,
          videoUrl: response.secure_url,
        },
      },
      { new: true }
    );
    res.status(200).josn({
      success: true,
      message: "Subsection is updated successfully",
      updatedSubSection,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.params;
    const deletedsubsection = await Subsection.findByIdAndDelete(
      { _id: subsectionId },
      {
        new: true,
      }
    );
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subsectionId,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
