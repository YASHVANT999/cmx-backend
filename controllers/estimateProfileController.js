const estimateProfile = require("../models/estimateProfileModel");
const estimateprofilePhotos = require("../models/estimateProfilePhotos");
const customers = require("../models/customerModel");
const vehicals = require("../models/customerVehicalModel");
const customerComment = require("../models/customerCommentsModel");
const users = require("../models/userModel");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const documents = require("../models/documentsModel");
const shops = require("../models/shopModel");

const estimateProfileRegisterController = async (req, res) => {
  try {
    const {
      shopId,
      customerId,
      vehicalId,
      owner,
      driver,
      firstName,
      lastName,
      year,
      make,
      model,
      vin,
      insurance,
      estimator,
      total,
      estimatorDate,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      country,
      companyName,
      staffId,
      insuranceId,
    } = req.body;
    const customerFound = await customers.findById(customerId);
  
    if (!customerFound) {
      return res.status(404).json({
        success: false,
        msg: "There is no such customer!",
      });
    }
    
    const otpGenerated = uuidv4();
    const findEstimate = await estimateProfile.findOne({ vehicalId });
  
    if (findEstimate) {
      return res.status(409).json({
        success: false,
        msg: "Duplicate estimate for the same vehicle!",
      });
    }
    const payload = {
      shopId,
      customerId,
      vehicalId,
      owner,
      driver,
      firstName,
      lastName,
      year,
      make,
      model,
      vin,
      insurance,
      estimator,
      total,
      estimatorDate,
      estimateToken: otpGenerated,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      country,
      companyName,
      staffId,
      insuranceId
    };
    if (!insurance) {
      delete payload.insurance;
    }
    const data = await estimateProfile.create(payload);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: customerFound.email,
      subject: "Estimate Profile",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Estimate Profile</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
      
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          h2 {
            color: #333333;
          }
      
          p {
            margin-bottom: 20px;
            line-height: 1.6;
          }
      
          a {
            color: #007bff;
            text-decoration: none;
          }
      
          a:hover {
            text-decoration: underline;
          }
      
          .note {
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Estimate Profile</h2>
          <p>Dear User,</p>
          <p>This is your Estimate Profile. Click on the below link to access it:</p>
          <p><a href="${process.env.FRONT_LINK}/chatlink/${otpGenerated}">Estimate Profile</a></p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>      
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      msg: "Estimate Profile Created !!!",
      data: data,
    });
  } catch (error) {
    console.log("estimateProfileRegisterController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error Occured !!!",
    });
  }
};

const estimateProfileGetAll = async (req, res) => {
  try {
    const { ShopId, limit } = req.params;

    const totalCount = await estimateProfile.countDocuments({
      repairOrder: false,
      Archived: false,
      shopId: ShopId,
    });

    const allEstimateData = await estimateProfile
      .find({ repairOrder: false, Archived: false, shopId: ShopId })
      .populate({
        path: "customerId",
        model: "customers",
      })
      .populate({
        path: "vehicalId",
        model: "customervehicals",
      })
      .populate({
        path: "insuranceId",
        model: "insurances",
      })
      .sort({ estimateId: 1 })
      .limit(limit);
    if (allEstimateData.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Estimate Found !!!",
        data: [],
      });
    }
    const currentDate = new Date();
    const daysThreshold = 60;

    const updatedEstimates = await Promise.all(
      allEstimateData.map(async (estimate) => {
        if (estimate.Activity && estimate.Activity.lastActivity) {
          const lastActivityDate = new Date(estimate.Activity.lastActivity);
          const diffTime = Math.abs(currentDate - lastActivityDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays > daysThreshold) {
            estimate.Archived = true;
            await estimate.save();
          }
        }
        return estimate;
      })
    );

    if (updatedEstimates.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Estimate Found !!!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      msg: "All Estimate Profiles !!!",
      data: updatedEstimates,
      totalCount: totalCount,
    });
  } catch (error) {
    console.log("estimateProfileGetAll", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error Occured !!!",
    });
  }
};

const estimateProfileSearch = async (req, res) => {
  try {
    const { text, ShopId } = req.params;
    const searchData = await estimateProfile
      .find({
        repairOrder: false,
        Archived: false,
        shopId: ShopId,
        $or: [
          { firstName: { $regex: text, $options: "i" } },
          { lastName: { $regex: text, $options: "i" } },
          { model: { $regex: text, $options: "i" } },
          { year: { $regex: text, $options: "i" } },
          { make: { $regex: text, $options: "i" } },
          { vin: { $regex: text, $options: "i" } },
          { insurance: { $regex: text, $options: "i" } },
          { estimator: { $regex: text, $options: "i" } },
          { total: { $regex: text, $options: "i" } },
          { estimateId: { $regex: text, $options: "i" } },
        ],
      })
      .populate({
        path: "customerId",
        model: "customers",
      })
      .populate({
        path: "vehicalId",
        model: "customervehicals",
      })
      .sort({ estimateId: -1 });
    if (!searchData) {
      res.status(404).json({
        success: false,
        msg: "Estimate Profiles Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Profiles Found!",
      data: searchData,
    });
  } catch (error) {
    console.log("estimateProfileSearch", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateProfileGetAllInAYear = async (req, res) => {
  try {
    const { year, month, ShopId } = req.params;
    if (Number(month) !== 0) {
      const getAllData = await estimateProfile.aggregate([
        {
          $match: {
            shopId: ShopId,
            estimatorDate: {
              $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
              $lt: new Date(
                `${month === "12" ? Number(year) + 1 : year}-${String(
                  Number(month === "12" ? 0 : month) + 1
                ).padStart(2, "0")}-01T00:00:00.000Z`
              ),
            },
          },
        },
      ]);
      res.status(200).json({
        success: true,
        msg: "Your data !!!",
        data: getAllData,
      });
    } else {
      const getAllData = await estimateProfile.aggregate([
        {
          $match: {
            shopId: ShopId,
            estimatorDate: {
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
            },
          },
        },
      ]);
      res.status(200).json({
        success: true,
        msg: "Your data !!!",
        data: getAllData,
      });
    }
  } catch (error) {
    console.log("estimateProfileGetAllInAYear", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateGetCustomerController = async (req, res) => {
  try {
    const { token } = req.params;
    const estimateFound = await estimateProfile.find({
      estimateToken: token,
    });

    if (!estimateFound.length) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    estimateFound[0].photoExpress =
      estimateFound[0].photoExpress.length > 0 &&
      estimateFound[0].photoExpress.map((file) => {
        if (file.filename !== "") {
          return {
            ...file,
            filename: `/photoExpress/${file.filename}`,
          };
        } else {
          return file;
        }
      });
    estimateFound[0].eSignatures =
      estimateFound[0].eSignatures &&
      `/eSignatures/${estimateFound[0].eSignatures}`;
    res.status(200).json({
      success: true,
      msg: "Your Customer Data !!!",
      data: estimateFound[0],
    });
  } catch (error) {
    console.log("estimateGetCustomerController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const updatePhotoController = async (req, res) => {
  try {
    const { gallery_id } = req.params;
    const { desc } = req.body;
    const estimatePhotoFound = await estimateprofilePhotos.findByIdAndUpdate(
      gallery_id,
      {
        $set: {
          dsc: desc,
          imageDescription: desc,
        },
      }
    );
    res.status(200).json({
      success: true,
      msg: "",
      data: estimatePhotoFound,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};
const estimateProfileUpdate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      country,
      companyName,
      vehicalDrivable,
      year,
      needsTow,
      make,
      model,
      exteriorColor,
      payForDamage,
      insurance,
      claim,
      dateOfLoss,
      deductible,
      insurancePhone,
      insurancePhone2,
      insuranceEmail,
      insuranceAdjusterName,
      repairVehical,
      howSoon,
      beenHereBefore,
      reference,
      estimateToken,
    } = req.body;

    let findEstimateProfileget = await estimateProfile.find({
      estimateToken: estimateToken,
    });
    if (!findEstimateProfileget) {
      return res.status(404).json({
        success: false,
        msg: "Wrong Token Provided !!!",
      });
    }
    let estimateId = findEstimateProfileget[0]._id;
    let primary_image_id = findEstimateProfileget[0].primary_image_id;

   
    
    let findEstimateProfilePhotoget = await estimateprofilePhotos
      .find({
        estimateProfileId: estimateId,
      })
      .sort({ created_at: -1 });

    if (findEstimateProfilePhotoget.length > 0) {
      let filterPrimary = findEstimateProfilePhotoget.filter(
        (val, i) => val.is_primary
      );
      if (filterPrimary.length > 0) {
        primary_image_id = filterPrimary[0]._id;
      } else {
        primary_image_id = findEstimateProfilePhotoget[0]._id;
      }
    }

    const findEstimateProfile = await estimateProfile.findOneAndUpdate(
      {
        estimateToken: estimateToken,
      },
      {
        firstName,
        lastName,
        phone,
        phone2,
        email,
        address,
        city,
        state,
        zipCode,
        country,
        companyName,
        vehicalDrivable,
        year,
        needsTow,
        make,
        model,
        exteriorColor,
        payForDamage,
        insurance,
        claim,
        dateOfLoss,
        deductible,
        insurancePhone,
        insurancePhone2,
        insuranceEmail,
        insuranceAdjusterName,
        repairVehical,
        howSoon,
        beenHereBefore,
        reference,
        primary_image_id,
      }
    );
    res.status(200).json({
      success: true,
      msg: "Data has been Updated !!!",
      data: findEstimateProfile,
    });
  } catch (error) {
    console.log("estimateProfileUpdate", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimatePhotoUpload = async (req, res) => {
  let deletedFile = null;
  const fieldsNull = Object.keys(req.body).filter(
    (key) => req.body[key] === ""
  );
  /*  console.log("req.files",req.files);
  console.log("req.body",req.body);
  console.log("fieldsNull",fieldsNull);
  return; */
  let objectBodyArr = [];
  try {
    const { estimateToken, imageID, photoType } = req.body;
    let findEstimateProfileget = await estimateProfile.find({
      estimateToken: estimateToken,
    });
    if (!findEstimateProfileget) {
      return res.status(404).json({
        success: false,
        msg: "Wrong Token Provided !!!",
      });
    }
    let photoType_get = "express_photos";
    if (photoType) {
      photoType_get = photoType;
    }
    /* const updatedDataE = await estimateProfile.findOneAndUpdate(
      { estimateToken: estimateToken },
      { photoExpress: [] }
    );
    return; */
    /* if (!req.files || req.files.length === 0) {     
      if (Object.values(req.body).some((value) => value === "")) {
        let findEstimateProfile = await estimateProfile.find({
          estimateToken: estimateToken,
        });
        if (!findEstimateProfile) {
          return res.status(404).json({
            success: false,
            msg: "Wrong Token Provided !!!",
          });
        }

       
        let photoExpress = findEstimateProfile[0].photoExpress.map((item) => {
          return fieldsNull.includes(String(item.fileField))
            ? { filename: "", fileField: item.fileField }
            : item;
        });
      
        deletedFile = photoExpress;
        const updatedData = await estimateProfile.findOneAndUpdate(
          { estimateToken: estimateToken },
          { photoExpress: photoExpress }
        );
        findEstimateProfile[0].photoExpress.map((item) => {
          fieldsNull.includes(String(item.fileField))
            ? fs.unlinkSync(
                path.join(
                  __dirname,
                  `../public/chatlinkPhotes/${item.filename}`
                )
              )
            : null;
        });
        return res.status(200).json({
          success: true,
          msg: "Some file is there !!!",
          data: updatedData,
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "File not Found !!!",
        });
      }
    } */
    /* console.log("req.files",req.files);
    return; */
    let estimateId = findEstimateProfileget[0]._id;
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
          // Id: new Date().toLocaleString()+"_"+req.file.filename,
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
          // is_primary: findEstimateProfilePhotoget.length <= 0 ? true : false,
          is_primary: false,
          filename: val.filename,
          fileField: val.fieldname,
        };
        const estimateProfileCreate = await estimateprofilePhotos.create(
          objectBody
        );
        objectBody.gallery_id = estimateProfileCreate._id;
        objectBody._id = estimateProfileCreate._id;
        const estimateFound = await estimateProfile.findByIdAndUpdate(
          estimateId,
          {
            $push: {
              // extraPhotes: { photoName: req.file.filename, imageDescription },
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
      res.status(200).json({
        success: true,
        msg: "Files has been Uploaded !!!",
        data: estimateFoundGet1,
        uploaded_data: objectBodyArr,
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "File not Found !!!",
        data: [],
      });
    }
    return;
    let findEstimateProfile = await estimateProfile.find({
      estimateToken: estimateToken,
    });
    deletedFile = photoExpress;
    if (!findEstimateProfile) {
      return res.status(404).json({
        success: false,
        msg: "Wrong Token Provided !!!",
      });
    }
    photoExpress = findEstimateProfile[0].photoExpress
      .filter((newFile) => {
        const exists = photoExpress.some(
          (existingFile) => existingFile.fileField === newFile.fileField
        );
        return !exists;
      })
      .concat(photoExpress);
    photoExpress = photoExpress.map((item) => {
      if (fieldsNull.includes(String(item.fileField))) {
        let photoPath = path.join(
          __dirname,
          `../public/chatlinkPhotes/${item.filename}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/chatlinkPhotes/${item.filename}`)
        ); */
      }
      return fieldsNull.includes(String(item.fileField))
        ? { filename: "", fileField: item.fileField }
        : item;
    });
    const updatedData = await estimateProfile.findOneAndUpdate(
      { estimateToken: estimateToken },
      { photoExpress: photoExpress }
    );
    if (findEstimateProfile[0].photoExpress.length > 0) {
      findEstimateProfile[0].photoExpress.forEach((file) => {
        if (
          !photoExpress.some(
            (newFile) =>
              newFile.fileField === file.fileField &&
              newFile.filename === file.filename
          )
        ) {
          if (file.filename !== "") {
            let photoPath = path.join(
              __dirname,
              `../public/chatlinkPhotes/${file.filename}`
            );
            // Check if file exists before deleting
            if (fs.existsSync(photoPath)) {
              fs.unlinkSync(photoPath);
            }
            /* fs.unlinkSync(
              path.join(__dirname, `../public/chatlinkPhotes/${file.filename}`)
            ); */
          }
        }
      });
    }
    res.status(200).json({
      success: true,
      msg: "Photo Updated sucessfully !!!",
      data: updatedData,
    });
  } catch (error) {
    console.log("estimatePhotoUpload", error);
    if (deletedFile) {
      deletedFile.map((file) => {
        let photoPath = path.join(
          __dirname,
          `../public/chatlinkPhotes/${file.filename}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
            path.join(__dirname, `../public/chatlinkPhotes/${file.filename}`)
          ) */
      });
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateEsignatureController = async (req, res) => {
  let deletedFile = req?.file?.filename;
  try {
    if (!req.file && !req.body) {
      return res.status(404).json({
        success: false,
        msg: "File not Found !!!",
      });
    }
    const {
      eSignaturesDate,
      eSignaturesStaffId,
      estimateToken,
      firstName,
      lastName,
      phone,
      text1,
      text2,
      text3,
    } = req.body;
    const findEstimateProfile = await estimateProfile.find({
      estimateToken: estimateToken,
    });
    if (!findEstimateProfile) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Profile not Found !!!",
      });
    }
    const estimateUpdate = await estimateProfile.findOneAndUpdate(
      { estimateToken: estimateToken },
      {
        $set: {
          firstName,
          lastName,
          phone,
          textArea: [{ text1, text2, text3 }],
          ...(req.file ? { eSignatures: req.file.filename } : {}),
        },
      }
    );
    if (findEstimateProfile[0]?.eSignatures && req.file) {
      let photoPath = path.join(
        __dirname,
        `../public/eSignatures/${findEstimateProfile[0].eSignatures}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(
        path.join(
          __dirname,
          `../public/eSignatures/${findEstimateProfile[0].eSignatures}`
        )
      ); */
    }
    res.status(200).json({
      success: true,
      msg: "data Updated !!!",
      data: estimateUpdate,
    });
  } catch (error) {
    console.log("estimatePhotoUpload", error);
    if (deletedFile) {
      let photoPath = path.join(
        __dirname,
        `../public/eSignatures/${deletedFile}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(
        path.join(__dirname, `../public/eSignatures/${deletedFile}`)
      ); */
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateProfileCustomerAndVehicalController = async (req, res) => {
  try {
    const { id } = req.params;
    let estimateFound = await estimateProfile
      .findOne({ estimateId: id, repairOrder: false })
      .populate([
        {
          path: "customerId",
          model: "customers",
        },
        {
          path: "vehicalId",
          model: "customervehicals",
        },
      ]);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    estimateFound.photoExpress =
      estimateFound.photoExpress.length > 0 &&
      estimateFound.photoExpress.map((file) => {
        if (file.filename !== "") {
          return {
            ...file,
            filename: `/photoExpress/${file.filename}`,
          };
        } else {
          return file;
        }
      });
    estimateFound.eSignatures =
      estimateFound.eSignatures && `/eSignatures/${estimateFound.eSignatures}`;

    let estimateProfileId = estimateFound._id;
    const estimateFoundGet1 = await estimateprofilePhotos
      .find({
        estimateProfileId: estimateProfileId,
      })
      .sort({ created_at: -1 });
    estimateFound.photesGalleries = estimateFoundGet1;

    const estimateComment = await customerComment.find({
      estimateId: estimateFound._id,
    });
    estimateFound = estimateFound.toObject();
    estimateFound.commentsLength = estimateComment.length;

    res.status(200).json({
      success: true,
      msg: "Your Customer Data !!!",
      data: estimateFound,
    });
  } catch (error) {
    console.log("estimateProfileCustomerAndVehicalController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateArchivedController = async (req, res) => {
  try {
    const { id } = req.params;
    await estimateProfile.findOneAndUpdate(id, {
      Archived: true,
    });
    res.status(200).json({
      success: true,
      msg: "Estimate has been Converted to Archived !!!",
    });
  } catch (error) {
    console.log("estimateArchivedController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const getAllEstimateArchivedController = async (req, res) => {
  try {
    const { shopId, limit } = req.params;
    const estimateArchivedData = await estimateProfile
      .find({
        shopId,
        Archived: true,
      })
      .populate({
        path: "customerId",
        model: "customers",
      })
      .populate({
        path: "vehicalId",
        model: "customervehicals",
      })
      .populate({
        path: "insuranceId",
        model: "insurances",
      })
      .sort({ estimateId: 1 })
      .limit(limit);
    if (!estimateArchivedData) {
      return res.status(404).json({
        success: false,
        msg: "Estimaet Archive Not Found  !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimaet Archive data Found  !!!",
      data: estimateArchivedData,
    });
  } catch (error) {
    console.log("getAllEstimateArchivedController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateEsignatureShopController = async (req, res) => {
  let deletedFile = req.file?.filename;
  try {
    const { staffId } = req.params;
    const {
      estimateId,
      eSignaturesDate,
      eSignaturesStaffId,
      eSignatureAuthorizationSigned,
    } = req.body;
    const staffFound = await users.findById(staffId);
    if (!staffFound) {
      return res.status(404).json({
        success: false,
        msg: "Staff Not Found !!!",
      });
    }
    const previousEstimateData = await estimateProfile.findById(estimateId);
    if (!previousEstimateData) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }

    const updateData = {
      eSignaturesDate,
      eSignaturesStaffId,
      eSignatureAuthorizationSigned,
    };

    if (req.file) {
      updateData.eSignatures = req.file.filename;
    }

    const estimateData = await estimateProfile.findByIdAndUpdate(
      estimateId,
      updateData,
      { new: true }
    );

    if (previousEstimateData.eSignatures && req.file) {
      let photoPath = path.join(
        __dirname,
        `../public/eSignatures/${previousEstimateData.eSignatures}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(
        path.join(
          __dirname,
          `../public/eSignatures/${previousEstimateData.eSignatures}`
        )
      ); */
    }
    res.status(200).json({
      success: true,
      msg: "Esignature has been Updated !!!",
      data: estimateData,
    });
  } catch (error) {
    console.log("estimateEsignatureShopController", error);
    if (deletedFile) {
      let photoPath = path.join(
        __dirname,
        `../public/eSignatures/${deletedFile}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(
        path.join(__dirname, `../public/eSignatures/${deletedFile}`)
      ); */
    }
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
const extraPhotesController = async (req, res) => {
  // console.log("req.files",req.files)
  /*  console.log("req.body.imageID",req.body.imageID)
  return; */

  // let deletedFile = req.file.filename;
  let files = req.files;
  try {
    const { estimateId } = req.params;
    const { imageDescription, imageID, is_primary } = req.body;
    const estimateFoundGet = await estimateProfile.findById(estimateId);

    if (!estimateFoundGet) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }

    let objectBodyArr = [];
    if (files.length > 0) {
      let upload_file = files.map(async (val, keyfile) => {
        let findEstimateProfilePhotoget = await estimateprofilePhotos
          .find({
            estimateProfileId: estimateId,
          })
          .sort({ created_at: -1 });
        const name = extractName(val.filename);
        let objectBody = {
          // Id: new Date().toLocaleString()+"_"+req.file.filename,
          Id: imageID[keyfile],
          estimateProfileId: estimateId,
          photoType: "extra_photos",
          name: name,
          type: val.mimetype,
          date: new Date().toLocaleString(),
          size: val.size,
          src: process.env.BACK_LINK + "photoExpress/" + val.filename,
          INputName: "",
          Activeborder: "",
          dsc: imageDescription,
          photoName: val.filename,
          imageDescription: imageDescription,
          // is_primary: findEstimateProfilePhotoget.length <= 0 ? true : false,
          is_primary: false,
        };
        const estimateProfileCreate = await estimateprofilePhotos.create(
          objectBody
        );
        objectBody.gallery_id = estimateProfileCreate._id;
        objectBody._id = estimateProfileCreate._id;
        const estimateFound = await estimateProfile.findByIdAndUpdate(
          estimateId,
          {
            $push: {
              // extraPhotes: { photoName: req.file.filename, imageDescription },
              extraPhotes: objectBody,
            },
          },
          { new: true }
        );
        objectBodyArr.push(objectBody);
      });
      await Promise.all(upload_file);
    }

    /* const estimateFound = await estimateProfile.findByIdAndUpdate(

    const name = extractName(req.file.filename);
    let objectBody = {
      // Id: new Date().toLocaleString()+"_"+req.file.filename,
      Id: imageID,
      name: name,
      type: "png",
      date: new Date().toLocaleString(),
      size: req.file.size,
      src: process.env.BACK_LINK + "photoExpress/" + req.file.filename,
      INputName: "",
      Activeborder: "",
      dsc: imageDescription,
      photoName: req.file.filename,
      imageDescription: imageDescription,
      is_primary: estimateFoundGet.length <= 0 ? true : is_primary,
    };
    const estimateFound = await estimateProfile.findByIdAndUpdate(

      estimateId,
      {
        $push: {
          // extraPhotes: { photoName: req.file.filename, imageDescription },
          extraPhotes: objectBody,
        },
      },
      { new: true }
    ); */
    let estimateProfileId = estimateId;
    const estimateFoundGet1 = await estimateprofilePhotos
      .find({
        estimateProfileId: estimateProfileId,
      })
      .sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      msg: "Files has been Uploaded !!!",
      data: estimateFoundGet1,
      uploaded_data: objectBodyArr,
    });
  } catch (error) {
    console.log("extraPhotesController", error);
    if (req.files.length > 0) {
      files.map(async (val, keyfile) => {
        let photoPath = path.join(
          __dirname,
          `../public/photoExpress/${val.name}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/photoExpress/${deletedFile}`)
        ); */
      });
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const extraPhotesUpdatePrimaryController = async (req, res) => {
  const { estimateId } = req.params;
  const { imageID, is_primary } = req.body;
  try {
    const estimateFoundGet = await estimateProfile.findById(estimateId);

    if (!estimateFoundGet) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const estimateprofilePhotosFoundGet = await estimateprofilePhotos.findById(
      imageID
    );

    /* let imageArray = estimateFoundGet.extraPhotes;
    if (imageArray.length > 0) {
      imageArray.map((val, i) => {
        if (val._id == imageID) {
          val.is_primary = true;
        } else {
          val.is_primary = false;
        }
        return val;
      });
    } */

    // estimateId
    const result = await estimateprofilePhotos.updateMany(
      { estimateProfileId: estimateId },
      { $set: { is_primary: false } }
    );
    const estimatePhotoFound = await estimateprofilePhotos.findByIdAndUpdate(
      imageID,
      {
        $set: {
          is_primary: true,
        },
      }
    );
    const estimateFound = await estimateProfile.findByIdAndUpdate(estimateId, {
      $set: {
        primary_image_id: imageID,
      },
    });

    res.status(200).json({
      success: true,
      msg: "Photo has been set as primary !!!",
      data: estimateFound,
    });
  } catch (error) {
    console.log("extraPhotesController", error);
    if (deletedFile) {
      const photoPath = path.join(
        __dirname,
        `../public/photoExpress/${deletedFile}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(
        path.join(__dirname, `../public/photoExpress/${deletedFile}`)
      ); */
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const getExtraPhotoController = async (req, res) => {
  const { estimateId } = req.params;
  const estimateFound = await estimateProfile.findById(estimateId);

  res.status(200).json({
    success: true,
    msg: "Photes found !!!",
    data: estimateFound,
  });
};
const deleteExtraPhotoController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const { deletList } = req.body;
    if (deletList.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "List is Empty !!!",
      });
    }
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimaet Not Found !!!",
      });
    }

    deletList.forEach(async (id) => {
      const deleted_image = await estimateprofilePhotos.findByIdAndDelete(id);

      if (deleted_image) {
        let estimateprofileUpdate = await estimateProfile.updateMany(
          {},
          {
            $pull: {
              photoExpress: { gallery_id: id },
              extraPhotes: { gallery_id: id },
            },
          }
        );
        let filePath = path.join(
          __dirname,
          `../public/photoExpress/${deleted_image.photoName}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        // const deleted_image = await estimateprofilePhotos.findByIdAndDelete(id);
      }
      const photo = estimateFound.extraPhotes.find(
        (item) => item._id.toString() === id
      );
      /* if (photo) {
        const photoPath = path.join(
          __dirname,
          `../public/photoExpress/${photo.photoName}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        estimateFound.extraPhotes.pull({ _id: photo._id });
      } */
    });

    // await estimateFound.save();

    res.status(200).json({
      success: true,
      msg: "Photes has been Deleted !!!",
    });
  } catch (error) {
    console.log("deleteExtraPhotoController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const paymentAmountController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const { paymentAmount } = req.body;
    const estimateCheck = estimateProfile.findById(estimateId);
    if (!estimateCheck) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const updatedPaymentAmount = {
      ...estimateCheck.paymentAmount,
      ...paymentAmount,
    };
    await estimateProfile.findByIdAndUpdate(
      estimateId,
      {
        $set: { paymentAmount: Object.values(updatedPaymentAmount) },
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      msg: "Payment has been Updated !!!",
    });
  } catch (error) {
    console.log("paymentAmountController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const paymentAmountFileController = async (req, res) => {
  let deletedFile = req.file ? req.file.filename : null;
  try {
    const { estimateId, key } = req.params;
    const {
      staffId,
      verifiedDate,
      paymentAmount,
      paymentAmountDue,
      paymentFrom,
    } = req.body;

    let estimateFound = await estimateProfile.findById(estimateId);

    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }

    let paymentAmountEntry = estimateFound.paymentAmount.find(
      (item) => item.key === key
    );

    if (paymentAmountEntry) {
      const paymentPreFile = paymentAmountEntry.paymentproofOfPayment;
      paymentAmountEntry.paymentproofOfPayment = req.file.filename;
      paymentAmountEntry.staffId = staffId;
      paymentAmountEntry.verifiedDate = verifiedDate;
      paymentAmountEntry.paymentAmount = paymentAmount;
      paymentAmountEntry.paymentAmountDue = paymentAmountDue;
      paymentAmountEntry.paymentFrom = paymentFrom;

      await estimateFound.save();

      if (paymentPreFile) {
        const photoPath = path.join(
          __dirname,
          `../public/payment/${paymentPreFile}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/payment/${paymentPreFile}`)
        ); */
      }
    } else {
      estimateFound.paymentAmount.push({
        key: key,
        paymentproofOfPayment: req.file.filename,
        staffId: staffId,
        verifiedDate: verifiedDate,
        paymentAmount: paymentAmount,
        paymentAmountDue: paymentAmountDue,
        paymentFrom: paymentFrom,
      });

      await estimateFound.save();
    }

    res.status(200).json({
      success: true,
      msg: "File has been Uploaded !!!",
    });
  } catch (error) {
    console.log("paymentAmountFileController", error);
    if (deletedFile) {
      const photoPath = path.join(
        __dirname,
        `../public/payment/${deletedFile}`
      );
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(path.join(__dirname, `../public/payment/${deletedFile}`)); */
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const updateOnChangePaymentAmountController = async (req, res) => {
  try {
    const { estimateId, key } = req.params;
    const {
      paymentFrom,
      paymentAmountDue,
      verifiedDate,
      postPayment,
      PaymentType,
      transaction,
      creditCardType,
      staffId,
    } = req.body;
    if (paymentAmountDue < postPayment) {
      return res.status(422).json({
        success: true,
        msg: "Payment Amount is greater tha post Payment !!!",
      });
    }
    const findPayment = await estimateProfile.findOne({
      _id: estimateId,
      "paymentAmount.key": key,
    });
    if (!findPayment) {
      await estimateProfile.findByIdAndUpdate(
        estimateId,
        {
          $push: {
            paymentAmount: {
              key,
              paymentFrom,
              paymentAmountDue,
              postPayment,
              PaymentType,
              transaction,
              creditCardType,
              verifiedDate,
              staffId,
            },
          },
        },
        { new: true, upsert: true }
      );
      return res.status(200).json({
        success: true,
        msg: "Payment has been Updates !!!",
      });
    }
    const estimateData = await estimateProfile.findOneAndUpdate(
      { _id: estimateId },
      {
        $set: {
          "paymentAmount.$[elem].paymentFrom": paymentFrom,
          "paymentAmount.$[elem].paymentAmountDue": paymentAmountDue,
          "paymentAmount.$[elem].verifiedDate": verifiedDate,
          "paymentAmount.$[elem].staffId": staffId,
          "paymentAmount.$[elem].postPayment": postPayment,
          "paymentAmount.$[elem].PaymentType": PaymentType,
          "paymentAmount.$[elem].transaction": transaction,
          "paymentAmount.$[elem].creditCardType": creditCardType,
        },
      },
      {
        arrayFilters: [{ "elem.key": key }],
        new: true,
        upsert: true,
      }
    );
    if (!estimateData) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Payment has been Updates !!!",
    });
  } catch (error) {
    console.log("updateOnChangePaymentAmountController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const splitPaymentEstimateController = async (req, res) => {
  let deletedFile = req.files;
  try {
    const { estimateId, key } = req.params;
    const files = req.files;
    const fields = req.body;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const estimatFoundKey = estimateFound.paymentAmount.find(
      (item) => item.key === key
    );
    estimatFoundKey.PaymentType = "Split";
    let newPayment = 0;
    Object.values(fields.splitData).map((item) => {
      const formattedSplitPostPayment = parseFloat(
        parseFloat(item.splitPostPayment).toFixed(2)
      );
      if (item._id) {
        let splitPaymentIndex = estimatFoundKey.splitPaymentAmount.findIndex(
          (spa) => spa._id.toString() === item._id
        );
        newPayment += formattedSplitPostPayment;
        estimatFoundKey.splitPaymentAmount[splitPaymentIndex] = {
          ...estimatFoundKey.splitPaymentAmount[splitPaymentIndex],
          ...item,
          SplitPaymentproofOfPayment:
            estimatFoundKey.splitPaymentAmount[splitPaymentIndex]
              .SplitPaymentproofOfPayment ||
            (item.ImageName !== "null"
              ? files.find((file) => file.fieldname === item.ImageName)
                ?.filename
              : null),
        };
      } else {
        if (item.ImageName === "null") {
          newPayment += formattedSplitPostPayment;
          estimatFoundKey.splitPaymentAmount.push({
            ...item,
            SplitPaymentproofOfPayment: null,
          });
        } else {
          newPayment += formattedSplitPostPayment;
          estimatFoundKey.splitPaymentAmount.push({
            ...item,
            SplitPaymentproofOfPayment: files.find(
              (file) => file.fieldname === item.ImageName
            ).filename,
          });
        }
      }
    });
    estimatFoundKey.postPayment = parseFloat(newPayment).toFixed(2);
    if (
      parseFloat(estimatFoundKey.postPayment) >
      parseFloat(estimatFoundKey.paymentAmountDue)
    ) {
      deletedFile.map((file) => {
        let photoPath = path.join(
          __dirname,
          `../public/payment/${file.filename}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/payment/${file.filename}`)
        ) */
      });
      return res.status(403).json({
        success: false,
        msg: "The post Payment is greater than Amount Due !!!",
      });
    }
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Split Payment has been Updated !!!",
    });
  } catch (error) {
    console.log("splitPaymentEstimateController", error);
    if (deletedFile) {
      deletedFile.map((file) => {
        let photoPath = path.join(
          __dirname,
          `../public/payment/${file.filename}`
        );
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/payment/${file.filename}`)
        ) */
      });
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const updateSplitDocumentController = async (req, res) => {
  try {
    const { estimateId, key, id } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const recordFound = estimateFound.paymentAmount.find(
      (item) => item.key === key
    );
    const splitFound = recordFound.splitPaymentAmount.find(
      (item) => new ObjectId(id)
    );
    let photoPath = path.join(
      __dirname,
      `../public/payment/${splitFound.SplitPaymentproofOfPayment}`
    );
    // Check if file exists before deleting
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
    /* fs.unlinkSync(
      path.join(
        __dirname,
        `../public/payment/${splitFound.SplitPaymentproofOfPayment}`
      )
    ); */
    splitFound.SplitPaymentproofOfPayment = req.file.filename;
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "File has been Updated !!!",
    });
  } catch (error) {
    console.log("updateSplitDocumentController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const fullPaymentEstimateController = async (req, res) => {
  const deletedFile = req.file.filename;
  try {
    const { estimateId, key } = req.params;
    const fields = req.body;
    const file = req.file;
    const estimateData = await estimateProfile.findOneAndUpdate(
      { _id: estimateId },
      {
        $set: {
          "paymentAmount.$[elem].paymentFrom": fields.paymentFrom,
          "paymentAmount.$[elem].paymentAmountDue": fields.paymentAmountDue,
          "paymentAmount.$[elem].verifiedDate": fields.verifiedDate,
          "paymentAmount.$[elem].staffId": fields.staffId,
          "paymentAmount.$[elem].postPayment": fields.paymentAmountDue,
          "paymentAmount.$[elem].PaymentType": fields.PaymentType,
          "paymentAmount.$[elem].transaction": fields.transaction,
          "paymentAmount.$[elem].creditCardType": fields.creditCardType,
          "paymentAmount.$[elem].paymentproofOfPayment": file?.filename,
        },
      },
      {
        arrayFilters: [{ "elem.key": key }],
        new: true,
        upsert: true,
      }
    );
    if (!estimateData) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Payment Added !!!",
    });
  } catch (error) {
    console.log("fullPaymentEstimateController", error);
    if (deletedFile) {
      let photoPath = path.join(__dirname, `../public/payment/${deletedFile}`);
      // Check if file exists before deleting
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      /* fs.unlinkSync(path.join(__dirname, `../public/payment/${deletedFile}`)); */
    }
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateArchivedSearchController = async (req, res) => {
  try {
    const { ShopId, text } = req.params;
    const estimateArchivedFound = await estimateProfile
      .find({
        repairOrder: false,
        shopId: ShopId,
        Archived: true,
        $or: [
          { firstName: { $regex: text, $options: "i" } },
          { lastName: { $regex: text, $options: "i" } },
          { model: { $regex: text, $options: "i" } },
          { year: { $regex: text, $options: "i" } },
          { make: { $regex: text, $options: "i" } },
          { vin: { $regex: text, $options: "i" } },
          { insurance: { $regex: text, $options: "i" } },
          { estimator: { $regex: text, $options: "i" } },
          { total: { $regex: text, $options: "i" } },
        ],
      })
      .populate({
        path: "customerId",
        model: "customers",
      })
      .populate({
        path: "vehicalId",
        model: "customervehicals",
      })
      .populate({
        path: "insuranceId",
        model: "insurances",
      })
      .sort({ estimateId: -1 });
    if (estimateArchivedFound.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No such Search Found  !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Search Data Found !!!",
      data: estimateArchivedFound,
    });
  } catch (error) {
    console.log("estimateArchivedSearchController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimatePaymentDocController = async (req, res) => {
  const { estimateId, key } = req.params;
  const {
    paymentAmount,
    PaymentType,
    Transaction,
    VerifiedDate,
    staffId,
    docIds,
  } = req.body;
  try {
    const findEstimate = await estimateProfile.findById(estimateId);
    if (!findEstimate) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const docFound = await documents.find({ estimateId });
    if (docFound.length === 0) {
      return res.status(500).json({
        success: false,
        msg: "Document Not Found !!!",
      });
    }
    const docPerFound = docFound[0].documents.filter((item) =>
      docIds.includes(item._id.toString())
    );
    if (docPerFound.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Document Not Found !!!",
      });
    }
    const findKeyEst = findEstimate.paymentAmount.find(
      (item) => item.key === key
    );
    findKeyEst.payments.push({
      paymentAmount,
      PaymentType,
      Transaction,
      VerifiedDate,
      staffId,
      DocumentIds: docIds,
    });
    let postPayment = 0;
    findKeyEst.payments.map((item) => {
      postPayment += parseFloat(item.paymentAmount);
    });
    findKeyEst.postPayment = postPayment.toFixed(2);
    if (findKeyEst.paymentAmountDue < findKeyEst.postPayment) {
      return res.status(422).json({
        success: true,
        msg: "Payment Amount is greater tha post Payment !!!",
      });
    }
    await findEstimate.save();
    res.status(200).json({
      success: true,
      msg: "Payment Document has been Uploaded !!!",
    });
  } catch (error) {
    console.log("estimatePaymentDocController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const allPaymentsController = async (req, res) => {
  try {
    const { estimateId, key } = req.params;
    const fields = req.body;
    const findEstimate = await estimateProfile.findById(estimateId);
    if (!findEstimate) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const findAmount = findEstimate.paymentAmount.find(
      (item) => item.key === key
    );
    findAmount.payments = fields.map((field) => ({
      paymentAmount: parseFloat(field.paymentAmount).toFixed(2),
      PaymentType: field.PaymentType,
      Transaction: field.Transaction,
      DocumentIds: field.DocumentIds,
      VerifiedDate: field.VerifiedDate,
      staffId: field.staffId,
      created_at: new Date(),
    }));
    let postPayment = 0;
    findAmount.payments.map(
      (item) => (postPayment += parseFloat(item.paymentAmount))
    );
    if (parseFloat(findAmount.paymentAmountDue) < parseFloat(postPayment)) {
      return res.status(422).json({
        success: true,
        msg: "Payment Amount is greater tha post Payment !!!",
      });
    }
    findAmount.postPayment = postPayment.toFixed(2);
    await findEstimate.save();
    res.status(200).json({
      success: true,
      msg: "Payments has been Updated !!!",
    });
  } catch (error) {
    console.log("allPaymentsController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimatePaymentDocUpdateController = async (req, res) => {
  try {
    const { estimateId, key } = req.params;
    const {
      _id,
      paymentAmount,
      PaymentType,
      Transaction,
      VerifiedDate,
      staffId,
      docIds,
    } = req.body;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const docEstimate = await documents.find({ estimateId });
    if (!docEstimate) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Document Not Found !!!",
      });
    }
    const ourDoc = docEstimate[0].documents.filter((item) =>
      docIds.includes(item._id.toString())
    );
    if (!ourDoc.length) {
      return res.status(404).json({
        success: false,
        msg: "Upload Doc Not Found!!!",
      });
    }
    const deleteIds = estimateFound.paymentAmount
      ?.find((item) => item.key === key)
      ?.payments?.find((item) => item._id.equals(_id))?.DocumentIds;
    deleteIds.forEach((deleteId) => {
      const deleteFile = docEstimate[0].documents.find((item) =>
        item._id.equals(deleteId)
      );
      let photoPath = null;
      if (deleteFile) {
        photoPath = path.join(
          __dirname,
          `../public/documents/${deleteFile.FileRefName}`
        );
      }
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    });
    docEstimate[0].documents = docEstimate[0].documents.filter(
      (item) => !deleteIds.includes(item._id)
    );
    const estimateKey = estimateFound.paymentAmount.find(
      (item) => item.key === key
    );
    const ourPayment = estimateKey.payments.find((item) =>
      item._id.equals(_id)
    );
    ourPayment.paymentAmount = parseFloat(paymentAmount).toFixed(2);
    ourPayment.PaymentType = PaymentType;
    ourPayment.Transaction = Transaction;
    ourPayment.VerifiedDate = VerifiedDate;
    ourPayment.staffId = staffId;
    ourPayment.DocumentIds = docIds;
    let newPayment = 0;
    estimateKey.payments.map(
      (item) => (newPayment += parseFloat(item.paymentAmount))
    );
    estimateKey.postPayment = newPayment.toFixed(2);
    await estimateFound.save();
    await docEstimate[0].save();
    res.status(200).json({
      success: true,
      msg: "Document Updated !!!",
    });
  } catch (error) {
    console.log("estimatePaymentDocUpdateController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const updateStatusUpdateController = async (req, res) => {
  try {
    const { estimateId, statusId, status } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    estimateFound.StatusUpdate[statusId] = status;
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Status has been Updated !!!",
    });
  } catch (error) {
    console.log("updateStatusUpdateController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

const estimateStaffController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found!!!",
      });
    }

    const staffRoles = [
      "ProductMangStaff",
      "OfficeStaff",
      "DetailTechStaff",
      "FrameTechStaff",
      "PainterStaff",
      "BodyTechStaff",
      "EstimatorStaff",
    ];

    const staffData = {};
    for (const role of staffRoles) {
      const staffId = req.body[role];
      if (staffId !== "" && staffId !== undefined) {
        const staffFound = await users.findById(staffId);
        if (!staffFound) {
          return res.status(404).json({
            success: false,
            msg: "No Such User Found!!!",
          });
        }
        staffData[role] = staffId;
      }
    }

    estimateFound.estimateStaff = staffData;
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Estimate Staff has been Saved!!!",
    });
  } catch (error) {
    console.log("estimateStaffController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred!!!",
    });
  }
};

const estimatestaffUpdateController = async (req, res) => {
  try {
    const { estimateId, staffRoles, stffId } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const staffFound = await users.findById(stffId);
    if (!staffFound) {
      return res.status(404).json({
        success: false,
        msg: "user Not Found !!!",
      });
    }
    estimateFound.estimateStaff[staffRoles] = stffId;
    await estimateFound.save();
  } catch (error) {
    console.log("estimatestaffUpdateController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred!!!",
    });
  }
};

const esimateActivityController = async (req, res) => {
  try {
    const { estimateId, staffId } = req.params;
    const estimateFound = await estimateProfile.findOne({ estimateId });
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    const useFound = await users.findById(staffId);
    if (!useFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such User Found !!!",
      });
    }
    estimateFound.Activity.lastUsersId = staffId;
    estimateFound.Activity.lastActivity = new Date();
    estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Estimate Activity has been Updated!!!",
    });
  } catch (error) {
    console.log("esimateActivityController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred!!!",
    });
  }
};

const insuranceSearchController = async (req, res) => {
  try {
    const { shopId, text } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const findEstimate = await estimateProfile.find({
      shopId,
      insurance: { $regex: text, $options: "i" },
      repairOrder: false,
    });
    res.status(200).json({
      success: true,
      msg: "Insurance Seacrh Found !!!",
      data: findEstimate,
    });
  } catch (error) {
    console.error("insuranceSearchController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateProfileDaysFilterController = async (req, res) => {
  try {
    const { shopId, days } = req.params;
    const daysInt = parseInt(days);
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop not Found !!!",
      });
    }
    const startDate = new Date(Date.now() - daysInt * 24 * 60 * 60 * 1000);
    const cutoffDate = new Date(startDate.getTime() - 10 * 24 * 60 * 60 * 1000);
    const findEstimateDays = await estimateProfile
      .find({
        shopId,
        created_at: { $gte: cutoffDate, $lt: startDate },
        repairOrder: false,
      })
      .populate([
        {
          path: "customerId",
          model: "customers",
        },
        {
          path: "vehicalId",
          model: "customervehicals",
        },
      ]);
    res.status(200).json({
      success: true,
      msg: "The Days in the Range are !!!",
      data: findEstimateDays,
    });
  } catch (error) {
    console.error("estimateProfileDaysFilterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateProfileAllFilterController = async (req, res) => {
  try {
    const { shopId, limit } = req.params;
    const { estimatro, insuranceSearch, days } = req.body;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop not Found!!!",
      });
    }

    const filter = {
      shopId: new ObjectId(shopId),
      Archived: false,
      repairOrder: false,
    };

    if (days) {
      const daysInt = parseInt(days) - 1;
      const startDate = new Date(Date.now() - daysInt * 24 * 60 * 60 * 1000);
      const cutoffDate = new Date(
        startDate.getTime() - 10 * 24 * 60 * 60 * 1000
      );
      filter.created_at = { $gte: cutoffDate, $lt: startDate };
    }

    if (estimatro) {
      filter["estimateStaff.EstimatorStaff"] = new ObjectId(estimatro);
    }

    if (insuranceSearch) {
      filter["insuranceId.InsuranceName"] = {
        $regex: insuranceSearch,
        $options: "i",
      };
    }

    const estimateFound = await estimateProfile.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerId",
        },
      },
      { $unwind: { path: "$customerId", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "customervehicals",
          localField: "vehicalId",
          foreignField: "_id",
          as: "vehicalId",
        },
      },
      { $unwind: { path: "$vehicalId", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "insurances",
          localField: "insuranceId",
          foreignField: "_id",
          as: "insuranceId",
        },
      },
      { $unwind: { path: "$insuranceId", preserveNullAndEmptyArrays: true } },
      {
        $match: filter,
      },
      {
        $facet: {
          totalCount: [{ $count: "totalCount" }],
          limitedResults: [{ $limit: parseInt(limit) }],
        },
      },
    ]);

    const totalCount = estimateFound[0]?.totalCount[0]?.totalCount;
    const limitedResults = estimateFound[0]?.limitedResults;

    res.status(200).json({
      success: true,
      msg: "Estimate Found!!!",
      totalCount: totalCount,
      data: limitedResults,
    });
  } catch (error) {
    console.error("estimateProfileAllFilterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const StatusUpdateAllController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const fields = req.body;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    estimateFound.StatusUpdate = fields;
    estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "The Time Line has been Updated !!!",
    });
  } catch (error) {
    console.error("StatusUpdateAllController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimatePOPController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    let photoPath = path.join(
      __dirname,
      `../public/popFiles/${estimateFound.popFile.name}`
    );
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
    estimateFound.popFile.name = req.files[0].filename;
    estimateFound.popFile.type = req.files[0].mimetype;
    estimateFound.popFile.size = req.files[0].size;
    estimateFound.popFile.src =
      process.env.BACK_LINK + "popFiles/" + req.files[0].filename;
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "POP File has been Uploaded !!!",
    });
  } catch (error) {
    console.error("estimatePOPController", error);
    if (req.files.length > 0) {
      files.map(async (val, keyfile) => {
        let photoPath = path.join(__dirname, `../public/popFiles/${val.name}`);
        // Check if file exists before deleting
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
        /* fs.unlinkSync(
          path.join(__dirname, `../public/photoExpress/${deletedFile}`)
        ); */
      });
    }
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateProofOfPaymentController = async (req, res) => {
  try {
    const { estimateId, docIds } = req.params;
    const docIdsprs = JSON.parse(docIds);
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    const docFound = await documents.find({ estimateId });
    if (docFound.length === 0) {
      return res.status(500).json({
        success: false,
        msg: "Document Not Found !!!",
      });
    }
    const docPerFound = docFound[0].documents.filter((item) =>
      docIdsprs.includes(item._id.toString())
    );
    if (docPerFound.length !== docIdsprs.length) {
      return res.status(404).json({
        success: false,
        msg: "Document Not Found !!!",
      });
    }

    estimateFound.popFile.forEach((id) => {
      const file = docFound[0].documents.find((item) => {
        return item._id.equals(id);
      });
      if (file) {
        const filePath = path.join(
          __dirname,
          `../public/documents/${file.FileRefName}`
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          const index = docFound[0].documents.indexOf(file);
          if (index !== -1) {
            docFound[0].documents.splice(index, 1);
          }
        }
      }
    });

    estimateFound.popFile = docIdsprs;
    await estimateFound.save();
    await documents.updateOne(
      { estimateId },
      { $set: { documents: docFound[0].documents } }
    );
    res.status(200).json({
      success: true,
      msg: "Proof of Payment have been Uploaded !!!",
    });
  } catch (error) {
    console.error("estimateProofOfPaymentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const checkEstimateController = async (req, res) => {
  try {
    const { id } = req.params;
    const estimateFound = await estimateProfile.findOne({
      estimateId: id,
      repairOrder: false,
    });
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Found !!!",
    });
  } catch (error) {
    console.error("checkEstimateController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateVehicalDeliveredController = async (req, res) => {
  try {
    const { estimateId, mark } = req.params;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    if (mark === "true") {
      estimateFound.StatusUpdate.Delivered = "Completed";
    } else {
      estimateFound.StatusUpdate.Delivered = "Default";
    }
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Delivered has been Updated !!!",
    });
  } catch (error) {
    console.error("estimateVehicalDeliveredController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estomateFollowUpController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const { followUpStaff, followUpDate } = req.body;
    const estimateFound = await estimateProfile.findById(estimateId);
    if (!estimateFound) {
      return res.status(500).json({
        success: false,
        msg: "No Such Estimate Found !!!",
      });
    }
    estimateFound.followUpDate = followUpDate;
    estimateFound.followUpStaff = followUpStaff;
    estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Follow-Up has been Updated !!!",
    });
  } catch (error) {
    console.error("estomateFollowUpController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const permissionEstimateController = async (req, res) => {
  try {
    const { type, value, id } = req.params;
    const estimateFound = await estimateProfile.findById(id);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    estimateFound[type] = value;
    await estimateFound.save();
    res.status(200).json({
      success: true,
      msg: "Permission has been Updated !!!",
    });
  } catch (error) {
    console.error("permissionEstimateController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateChatLinkInviteController = async (req, res) => {
  try {
    const { id } = req.params;
    const estimateFound = await estimateProfile.findById(id);
    if (!estimateFound) {
      res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: estimateFound.email,
      subject: "Estimate Profile",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Estimate Profile</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
      
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          h2 {
            color: #333333;
          }
      
          p {
            margin-bottom: 20px;
            line-height: 1.6;
          }
      
          a {
            color: #007bff;
            text-decoration: none;
          }
      
          a:hover {
            text-decoration: underline;
          }
      
          .note {
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Estimate Profile</h2>
          <p>Dear User,</p>
          <p>This is your Estimate Profile. Click on the below link to access it:</p>
          <p><a href="${process.env.FRONT_LINK}/chatlink/${estimateFound.estimateToken}">Estimate Profile</a></p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>      
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: false,
      msg: "ChatLink Invite Send To Your Email !!!",
    });
  } catch (error) {
    console.error("estimateChatLinkInviteController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  estimateProfileRegisterController,
  estimateProfileGetAll,
  estimateProfileSearch,
  estimateProfileGetAllInAYear,
  estimateGetCustomerController,
  estimateProfileUpdate,
  estimatePhotoUpload,
  estimateEsignatureController,
  estimateProfileCustomerAndVehicalController,
  estimateArchivedController,
  getAllEstimateArchivedController,
  estimateEsignatureShopController,
  extraPhotesController,
  extraPhotesUpdatePrimaryController,
  deleteExtraPhotoController,
  getExtraPhotoController,
  updatePhotoController,
  paymentAmountController,
  paymentAmountFileController,
  updateOnChangePaymentAmountController,
  splitPaymentEstimateController,
  updateSplitDocumentController,
  fullPaymentEstimateController,
  estimateArchivedSearchController,
  estimatePaymentDocController,
  allPaymentsController,
  estimatePaymentDocUpdateController,
  updateStatusUpdateController,
  estimateStaffController,
  estimatestaffUpdateController,
  esimateActivityController,
  insuranceSearchController,
  estimateProfileDaysFilterController,
  estimateProfileAllFilterController,
  StatusUpdateAllController,
  estimatePOPController,
  estimateProofOfPaymentController,
  checkEstimateController,
  estimateVehicalDeliveredController,
  estomateFollowUpController,
  permissionEstimateController,
  estimateChatLinkInviteController,
};
