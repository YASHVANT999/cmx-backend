const estimateChatLinks = require("../models/estimateChatLinkModel");
const shops = require("../models/shopModel");
const customers = require("../models/customerModel");
const estimatesProfiles = require("../models/estimateProfileModel");
const ObjectId = require("mongodb").ObjectId;
const estimateprofilePhotos = require("../models/estimateProfilePhotos");
const path = require("path");
const fs = require("fs");

const estimateChatLinkregistreController = async (req, res) => {
  try {
    const { role, estimateToken, message } = req.body;
    const estimateProfileData = await estimatesProfiles.findOne({
      estimateToken,
    });
    if (!estimateProfileData) {
      return res.status(404).json({
        success: false,
        msg: "No Estimate Found !!!",
      });
    }
    const chatLinkData = await estimateChatLinks.findOne({
      estimateId: estimateProfileData._id,
    });
    if (!chatLinkData) {
      await estimateChatLinks.create({
        estimateId: estimateProfileData._id,
        messages: [{ message, role, messageType: "Text" }],
      });
    } else {
      chatLinkData.messages.push({
        message,
        role,
        messageType: "Text",
      });
      await chatLinkData.save();
    }

    res.status(200).json({
      success: true,
      msg: "Message Send !!!",
    });
  } catch (error) {
    console.log("estimateChatLinkregistreController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const getestimateChatController = async (req, res) => {
  try {
    const { estimateToken } = req.params;
    const estimateProfileData = await estimatesProfiles
      .find({ estimateToken })
      .populate({
        path: "customerId",
        model: "customers",
      })
      .populate({
        path: "vehicalId",
        model: "customervehicals",
      })
      .populate({
        path: "shopId",
        model: "shops",
      });
    if (!estimateProfileData[0]) {
      return res.status(200).json({
        success: false,
        msg: "Chat Not Found !!!",
        data: [],
      });
    }
    const estimateMessages = await estimateChatLinks.findOne({
      estimateId: estimateProfileData[0]._id,
    });
    if (!estimateMessages) {
      return res.status(404).json({
        success: false,
        msg: "Messages Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Messages are Here !!!",
      data: estimateMessages.messages,
      customerData: estimateProfileData[0],
    });
  } catch (error) {
    console.log("getestimateChatController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const getAllChatShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const estimateMessages = await estimateChatLinks.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateProfile",
        },
      },
      {
        $unwind: "$estimateProfile",
      },
      {
        $match: {
          "estimateProfile.shopId": new ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateProfile.customerId",
          foreignField: "_id",
          as: "customerId",
        },
      },
      {
        $unwind: "$customerId",
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateProfile.vehicalId",
          foreignField: "_id",
          as: "vehicalId",
        },
      },
      {
        $unwind: "$vehicalId",
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Found All the Chat Customers !!!",
      data: estimateMessages,
    });
  } catch (error) {
    console.log("getAllChatShopController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const updateSeenController = async (req, res) => {
  try {
    const { estimateToken, role } = req.params;
    const estimateProfileData = await estimatesProfiles.find({ estimateToken });
    if (!estimateProfileData[0]) {
      return res.status(200).json({
        success: false,
        msg: "No Such estimate Found !!!",
        data: [],
      });
    }
    const estimateMessages = await estimateChatLinks.findOne({
      estimateId: estimateProfileData[0]._id,
    });
    if (!estimateMessages) {
      return res.status(404).json({
        success: false,
        msg: "Message Not Found !!!",
      });
    }
    const allMessagesSeen = estimateMessages.messages.every(
      (item) => item.role !== role || item.messageSeen === true
    );
    if (allMessagesSeen) {
      return res.status(200).json({
        success: true,
        msg: "Message has been Updated !!!",
        broadCast: false,
      });
    }
    estimateMessages.messages.forEach((item) => {
      if (item.role === role) {
        item.messageSeen = true;
      }
    });
    await estimateMessages.save();
    res.status(200).json({
      success: true,
      msg: "Message has been Updated !!!",
      broadCast: true,
    });
  } catch (error) {
    console.log("updateSeenController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const getAllUnSeenChatController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const findChatLink = await estimateChatLinks.aggregate([
      {
        $match: {
          "messages.role": "Customer",
          "messages.messageSeen": false,
          estimateId: new ObjectId(shopId),
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $match: {
          "messages.role": "Customer",
          "messages.messageSeen": false,
        },
      },
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateProfileData",
        },
      },
      {
        $unwind: "$estimateProfileData",
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              { estimateProfileData: "$estimateProfileData" },
            ],
          },
        },
      },
      {
        $sort: { "messages.SendAt": -1 },
      },
      {
        $group: {
          _id: "$estimateId",
          UnSeenChat: { $sum: 1 },
          estimateProfileData: { $first: "$estimateProfileData" },
          lastMessageDate: { $first: "$messages.SendAt" },
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateProfileData.vehicalId",
          foreignField: "_id",
          as: "vehicalId",
        },
      },
      {
        $unwind: "$vehicalId",
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "UnSeen Chats are !!!",
      data: findChatLink,
    });
  } catch (error) {
    console.log("getAllUnSeenChatController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const extractName = (photoName) => {
  const lastUnderscoreIndex = photoName.lastIndexOf("_");
  const lastPeriodIndex = photoName.lastIndexOf(".");
  return photoName.substring(lastUnderscoreIndex + 1, lastPeriodIndex);
};
const estimateChatLinkDocumentController = async (req, res) => {
  let files = req.files;
  let objectBodyArr = [];
  try {
    const { estimateId } = req.params;
    let { role, imageID, photoType } = req.body;
    imageID = JSON.parse(imageID);
    let findEstimateProfileget = await estimatesProfiles.findById(estimateId);
    if (!findEstimateProfileget) {
      return res.status(404).json({
        success: false,
        msg: "Wrong Token Provided !!!",
      });
    }
    const findEstimateChat = await estimateChatLinks.findOne({ estimateId });
    if (!findEstimateChat) {
      return res.status(404).json({
        success: false,
        msg: "estimate Chat not Found !!!",
      });
    }
    let photoType_get = "express_photos";
    if (photoType) {
      photoType_get = photoType;
    }
    if (req.files || req.files.length > 0) {
      let upload_file = req.files.map(async (val, keyfile) => {
        let findEstimateProfilePhotoget = await estimateprofilePhotos
          .find({
            estimateProfileId: estimateId,
          })
          .sort({ created_at: -1 });
        let name = extractName(val.filename);
        let desc = val.fieldname
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (str) => str.toUpperCase());

        let objectBody = {
          Id: imageID[keyfile],
          estimateProfileId: estimateId,
          photoType: photoType_get,
          name: name,
          type: val.mimetype,
          date: new Date().toLocaleString(),
          size: val.size,
          src: process.env.BACK_LINK + "photoExpress/" + val.filename,
          INputName: "",
          Activeborder: "",
          dsc: desc,
          photoName: val.filename,
          imageDescription: desc,
          is_primary: false,
          filename: val.filename,
          fileField: val.fieldname,
        };
        const estimateProfileCreate = await estimateprofilePhotos.create(
          objectBody
        );
        objectBody.gallery_id = estimateProfileCreate._id;
        objectBody._id = estimateProfileCreate._id;
        const estimateFound = await estimatesProfiles.findByIdAndUpdate(
          estimateId,
          {
            $push: {
              photoExpress: objectBody,
            },
          },
          { new: true }
        );
        objectBodyArr.push(objectBody);
      });
      await Promise.all(upload_file);

      let estimateProfileId = estimateId;
      const estimateFoundGet1 = await estimateprofilePhotos
        .find({
          estimateProfileId: estimateProfileId,
        })
        .sort({ created_at: -1 });
      objectBodyArr.map((item) => {
        let messageType;
        if (item.type.startsWith("image/")) {
          messageType = "Image";
        } else {
          messageType = "Document";
        }
        findEstimateChat.messages.push({
          role,
          messageType,
          file: {
            src: item.src,
            fileName: item.name,
            fileSize: item.size,
            fileType: item.type,
          },
        });
      });
      await findEstimateChat.save();
      res.status(200).json({
        success: true,
        msg: "Files has been Uploaded !!!",
        data: estimateFoundGet1,
        uploaded_data: objectBodyArr,
      });
    }
  } catch (error) {
    console.log("estimateChatLinkDocumentController", error);
    if (req.files.length > 0) {
      files.map(async (val, keyfile) => {
        let photoPath = path.join(
          __dirname,
          `../public/photoExpress/${val.name}`
        );
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

module.exports = {
  estimateChatLinkregistreController,
  getestimateChatController,
  getAllChatShopController,
  updateSeenController,
  getAllUnSeenChatController,
  estimateChatLinkDocumentController,
};
