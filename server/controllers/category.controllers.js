const Category = require("../models/category.models");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }
    const categoryDetails = await Category.create({
      name,
      description,
    });
    res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: categoryDetails,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      message: "categories fetch successfully",
      categories: categories,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Intrernel server error",
    });
  }
};

exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const fetchCategory = await Category.find({ _id: categoryId }).populate(
      "course"
    );
    if (!fetchCategory) {
      return res.status(400).json({
        success: false,
        messgae: "Data not found",
      });
    }
    const diffCategoryCourse = await Category.find({
      _id: {
        $ne: categoryId,
      },
    }).populate("courses");
    //top selling course
    return res.status(200).json({
      success: true,
      message: "Successfully",
      data: {
        fetchCategory,
        diffCategoryCourse,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
