const documents = require("../models/documentsModel");
const estimates = require("../models/estimateProfileModel");
const users = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const documentRegisterContoller = async (req, res) => {
  const deleteFile = req.files;
  const files = req.files;
  const FieldObj = Object.fromEntries(
    Object.entries(req.body).map(([key, value]) => [key, JSON.parse(value)])
  );
  const { estimateId, staffId } = req.params;
  try {
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!!!",
      });
    }
    const findUser = await users.findById(staffId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found !!!!!",
      });
    }
    const createDocuments = files.map((item) => ({
      DocumentName: FieldObj[item.fieldname].name,
      DocumentType: item.mimetype,
      Category: FieldObj[item.fieldname].Category,
      FileRefName: item.filename,
      Description: FieldObj[item.fieldname].Description,
      documentDate: new Date(),
      DocumentshowName: FieldObj[item.fieldname].DocumentName,
      Size: item.size,
      StaffDoc: `${findUser.firstName} ${findUser.lastName}`,
      staffDocId: findUser._id,
    }));
    let newDocumentIds = [];
    const findDocument = await documents.find({ estimateId });
    if (findDocument.length === 0) {
      const createdDoc = await documents.create({
        estimateId,
        staffId,
        documents: createDocuments,
      });
      newDocumentIds = createdDoc.documents.map((doc) => doc._id);
    } else {
      const existingDocumentIds = findDocument[0].documents.map(
        (doc) => doc._id
      );
      findDocument[0].documents.push(...createDocuments);
      await findDocument[0].save();
      const allDocumentIds = findDocument[0].documents.map((doc) => doc._id);
      newDocumentIds = allDocumentIds.filter(
        (id) => !existingDocumentIds.includes(id)
      );
    }
    res.status(200).json({
      success: true,
      msg: "Documents has been Uploaded !!!!!!!!!",
      data: newDocumentIds,
    });
  } catch (error) {
    console.log("documentRegisterContoller", error);
    if (deleteFile.length === 0) {
      deleteFile.map((item) => {
        let photoPath = path.join(
          __dirname,
          `../public/documents/${item.filename}`
        );
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentUpdateController = async (req, res) => {
  try {
    const {
      folderxId,
      documentId,
      DocumentName,
      Category,
      FileName,
      Description,
      Staff,
      documentDate,
      Size,
    } = req.body;
    const findFolderx = await folderxs.findById(folderxId);
    if (!findFolderx) {
      return res.status(404).json({
        success: false,
        msg: "Folderx Not Found !!!",
      });
    }
    const findDocumentsOld = await documents.find({ folderxId });
    if (!findDocumentsOld) {
      return res.status(404).json({
        success: false,
        msg: "Documenst Not Found !!!",
      });
    }
    const documentIdObject = new mongoose.Types.ObjectId(documentId);

    const filteredDocument = findDocumentsOld[0].documents.filter((item) =>
      item._id.equals(documentIdObject)
    );
    if (req.file) {
      fs.unlinkSync(
        path.join(
          __dirname,
          `../public/documents/${filteredDocument[0].FileRefName}`
        )
      );
    }
    const findDocuments = await documents.findOneAndUpdate(
      { folderxId, "documents._id": documentId },
      {
        $set: {
          "documents.$.DocumentName": DocumentName,
          "documents.$.Category": Category,
          "documents.$.FileName": FileName,
          "documents.$.Description": Description,
          "documents.$.Staff": Staff,
          "documents.$.documentDate": documentDate,
          "documents.$.Size": Size,
          "documents.$.FileRefName": req.file.filename,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "Document has been Crated !",
      //   data: documentcreate,
    });
  } catch (error) {
    console.log("documentUpdateController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentUserDataController = async (req, res) => {
  try {
    const { id } = req.params;
    const documentData = await documents.findById(id);
    if (!documentData) {
      return res.status(404).json({
        success: false,
        msg: "No such Document Data Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Document Data is",
      data: documentData,
    });
  } catch (error) {
    console.log("documentUserDataController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentEstimateController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const findDocument = await documents.find({ estimateId });
    if (findDocument.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Documents Not Found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Document of Estimates !!!",
      data: findDocument[0].documents,
    });
  } catch (error) {
    console.log("documentEstimateController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentDeleteController = async (req, res) => {
  try {
    const { estimateId, DocIDs } = req.params;
    const estimateFound = estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const docFound = await documents.find({ estimateId });
    if (docFound.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No Estimate Documents Found !!!",
      });
    }
    const documentsToRemove = docFound[0].documents.filter((item) =>
      DocIDs.includes(item._id)
    );
    await Promise.all(
      documentsToRemove.map((item) => {
        return estimates.findOneAndUpdate(
          {
            _id: estimateId,
            paymentAmount: {
              $elemMatch: {
                payments: {
                  $elemMatch: { DocumentIds: { $in: [item._id.toString()] } },
                },
              },
            },
          },
          {
            $pull: {
              "paymentAmount.$.payments.$[payment].DocumentIds": item._id.toString(),
            },
          },
          {
            arrayFilters: [
              { "payment.DocumentIds": { $in: [item._id.toString()] } },
            ],
          }
        );
      })
    );
    docFound[0].documents = docFound[0].documents.filter((item) => {
      if (DocIDs.includes(item._id)) {
        let photoPath = path.join(
          __dirname,
          `../public/documents/${item.FileRefName}`
        );
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        return false;
      }
      return true;
    });
    await docFound[0].save();
    res.status(200).json({
      success: true,
      msg: "The Documents Has been Deleted!!!",
    });
  } catch (error) {
    console.log("documentDeleteController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentUpdateEstimateAllController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const { updateDocData } = req.body;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const docFound = await documents.find({ estimateId });
    if (docFound.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Document Not Found !!!",
      });
    }
    docFound[0].documents.map((item) => {
      item.Category = updateDocData[item._id].Category;
      item.Description = updateDocData[item._id].Description;
      item.DocumentshowName = updateDocData[item._id].DocumentshowName;
    });
    await docFound[0].save();
    res.status(200).json({
      success: true,
      msg: "The Documenst has been Updated !!!",
    });
  } catch (error) {
    console.log("documentUpdateEstimateAllController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const documentSortController = async (req, res) => {
  try {
    const { estimateId, type } = req.params;
    const estimateFound = await documents
      .findOne({ estimateId })
      .sort({ [type]: -1 });
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const sortedDocuments = estimateFound.documents.sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
    res.status(200).json({
      success: true,
      msg: "Found Data",
      data: sortedDocuments,
    });
  } catch (error) {
    console.log("documentSortController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  documentRegisterContoller,
  documentUpdateController,
  documentUserDataController,
  documentEstimateController,
  documentDeleteController,
  documentUpdateEstimateAllController,
  documentSortController,
};
