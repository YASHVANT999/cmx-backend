const customerComments = require("../models/customerCommentsModel");
const estimates = require("../models/estimateProfileModel");
const users = require("../models/userModel");

const commentRegisterController = async (req, res) => {
  try {
    const { estimateId, commentCategory, commentVal, staffId } = req.body;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !",
      });
    }
    const userFound = await users.findById(staffId);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found !",
      });
    }
    const commentCreated = await customerComments.create({
      estimateId,
      commentCategory,
      commentVal,
      staffId: `${userFound.firstName} ${userFound.lastName}`,
      staffIdReal: userFound._id,
    });
    res.status(200).json({
      success: true,
      msg: "Comment Created !!!",
      data: commentCreated,
    });
  } catch (error) {
    console.error("commentRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getAllCommentsOfEstimateConntroller = async (req, res) => {
  try {
    const { estimateId, data } = req.params;
    const commentDataFound = await customerComments
      .find({ estimateId })
      .sort({ created_at: -1 })
      .limit(data);
    if (commentDataFound.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Estimate Comment Found !",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Estimate Comments !",
      data: commentDataFound,
    });
  } catch (error) {
    console.error("getAllCommentsOfEstimateConntroller", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteComment = await customerComments.findOneAndDelete({ _id: id });
    if (!deleteComment) {
      return res.status(404).json({
        success: false,
        msg: "Comment Not Found !",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Comment has been Deleted !",
      data: deleteComment,
    });
  } catch (error) {
    console.error("deleteCommentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const updateCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentCategory, commentVal, staffId } = req.body;
    const commentFind = await customerComments.findById(commentId);
    if (!commentFind) {
      return res.status(404).json({
        success: false,
        msg: "No Comment Found !!!",
      });
    }
    commentFind.commentCategory = commentCategory;
    commentFind.commentVal = commentVal;
    commentFind.staffId = staffId;
    await commentFind.save();
    res.status(200).json({
      success: true,
      msg: "Comment has been Updated !!!",
    });
  } catch (error) {
    console.error("updateCommentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getSortCommentsController = async (req, res) => {
  try {
    const { estimateId, data, sortData, sortType } = req.params;
    const commentDataFound = await customerComments
      .find({ estimateId })
      .sort({ created_at: -1 })
      .limit(data);
    if (commentDataFound.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No Estimate Comment Found !",
      });
    }
    commentDataFound.sort((a, b) => {
      if (a[sortData] < b[sortData]) return -1 * sortType;
      if (a[sortData] > b[sortData]) return 1 * sortType;
      return 0;
    });
    res.status(200).json({
      success: true,
      msg: "Your Estimate Comments !",
      data: commentDataFound,
    });
  } catch (error) {
    console.error("getSortCommentsController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  commentRegisterController,
  getAllCommentsOfEstimateConntroller,
  deleteCommentController,
  updateCommentController,
  getSortCommentsController,
};
