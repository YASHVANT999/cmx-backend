const shops = require("../models/shopModel");
const defaultshopcomments = require("../models/defaultShopCommentsModel");
const mongoose = require("mongoose");

const addDefaultShopCommentController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { commentTitle, commentCategory, comment } = req.body;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(500).json({
        success: false,
        msg: "Shop not Found !!!",
      });
    }
    const commentsFound = await defaultshopcomments.findOne({ shopId });
    if (!commentsFound) {
      await defaultshopcomments.create({
        shopId,
        comments: {
          commentTitle,
          commentCategory,
          comment,
        },
      });
    } else {
      commentsFound.comments.push({
        commentTitle,
        commentCategory,
        comment,
      });
      commentsFound.save();
    }
    res.status(200).json({
      success: true,
      msg: "New Comment has been Added !!!",
    });
  } catch (error) {
    console.log("addDefaultShopCommentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const getDefaultShopCommentController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const commentsFound = await defaultshopcomments.aggregate([
      {
        $match: { shopId: new mongoose.Types.ObjectId(shopId) },
      },
      {
        $unwind: "$comments",
      },
      {
        $group: {
          _id: "$comments.commentCategory",
          comments: { $push: "$comments" },
        },
      },
    ]);
    if (!commentsFound) {
      return res.status(404).json({
        success: false,
        msg: "No Comments Found !!!",
      });
    }
    const groupedComments = commentsFound.reduce((acc, curr) => {
      acc[curr._id] = curr.comments;
      return acc;
    }, {});
    res.status(200).json({
      success: true,
      msg: "Comments Found !!!",
      data: groupedComments,
    });
  } catch (error) {
    console.log("getDefaultShopCommentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const updateDefaultShopCommentController = async (req, res) => {
  try {
    const { shopId, commentId } = req.params;
    const { commentTitle, commentCategory, comment } = req.body;
    const commentsFound = await defaultshopcomments.findOne({ shopId });
    if (!commentsFound) {
      return res.status(404).json({
        success: false,
        msg: "Comments not Found !!!",
      });
    }
    const findComment = commentsFound.comments.find(
      (item) => item._id.toString() === commentId
    );
    findComment.commentTitle = commentTitle;
    // findComment.commentCategory = commentCategory;
    findComment.comment = comment;
    await commentsFound.save();
    res.status(200).json({
      success: true,
      msg: "Comments Updated !!!",
    });
  } catch (error) {
    console.log("updateDefaultShopCommentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const getCategoryCommentsController = async (req, res) => {
  try {
    const { shopId, category } = req.params;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const commentFound = await defaultshopcomments.aggregate([
      {
        $match: { shopId: new mongoose.Types.ObjectId(shopId) },
      },
      {
        $project: {
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.commentCategory", category] },
            },
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Comment Found !!!",
      data: commentFound[0].comments,
    });
  } catch (error) {
    console.log("getCategoryCommentsController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  addDefaultShopCommentController,
  getDefaultShopCommentController,
  updateDefaultShopCommentController,
  getCategoryCommentsController,
};
