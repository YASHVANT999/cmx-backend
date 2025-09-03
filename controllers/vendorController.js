const vendors = require("../models/vendorModel");
const shops = require("../models/shopModel");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../middleware/generateAccessToken");
const accountSid = "AC2c6bf8f3dd5763b9585e673980411a6f";
const authToken = "a10413900b307103c378abc2a4b59416";
const client = require("twilio")(accountSid, authToken);

const vendorRegisterController = async (req, res) => {
  try {
    const {
      shopId,
      userName,
      password,
      vendorName,
      vendorFirstName,
      vendorLastName,
      vendorPhoneMain,
      vendorPhoneDirect,
      vendorEmail,
      vendorWebsite,
      vendorAddress,
      vendorCity,
      vendorState,
      vendorZipCode,
      VendorType,
      vendorDealerShipBrand,
    } = req.body;
    if (!password || !userName) {
      return res.status(404).json({
        sucess: false,
        msg: "UserName or Password Not Found",
      });
    }
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      res.status(404).json({
        sucess: false,
        msg: "The Shop Not Found",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(
      password,
      saltRounds,
      process.env.ACCESS_TOKEN_SECRET
    );
    const createVendor = await vendors.create({
      shopId,
      userName,
      password: hashedPassword,
      vendorName,
      vendorFirstName,
      vendorLastName,
      vendorPhoneMain,
      vendorPhoneDirect,
      vendorEmail,
      vendorWebsite,
      vendorAddress,
      vendorCity,
      vendorState,
      vendorZipCode,
      VendorType,
      vendorDealerShipBrand,
    });
    res.status(200).json({
      sucess: true,
      msg: "Vendor has been Created",
      data: createVendor,
    });
  } catch (error) {
    console.log("vendorRegisterController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const vendorLogInController = async (req, res) => {
  try {
    const { Username, password, shopId } = req.body;
    const shopFound = await shops.findOne({
      shopId: { $regex: shopId, $options: "i" },
    });
    if (!shopFound) {
      return res.status(404).json({
        sucess: false,
        msg: "Shop Not Found!!",
      });
    }
    const getData = await vendors.findOne({
      $or: [{ email: Username }, { userName: Username }],
      shopId: shopFound._id,
    });
    if (!getData || getData?.length <= 0) {
      return res
        .status(404)
        .send({ sucess: false, msg: "Username not Found!", data: [] });
    }
    const hashedPassword = getData.password;
    const token = generateAccessToken(getData._id);
    if (await bcrypt.compare(password, hashedPassword)) {
      return res.status(200).send({
        sucess: true,
        msg: "Login Successful !!!",
        token: token,
      });
    } else {
      console.log("---------> Password Incorrect");
      res
        .status(404)
        .send({ sucess: false, msg: "Password incorrect!", data: [] });
    }
  } catch (error) {
    console.log("vendorLogInController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const vendorDetailController = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const findVendor = await vendors.findById(vendorId);
    if (!findVendor) {
      return res.status(404).json({
        sucess: false,
        msg: "Vendor Not Found",
      });
    }
    return res.status(200).json({
      sucess: false,
      msg: "Vendor Not Found",
      data: findVendor,
    });
  } catch (error) {
    console.log("vendorDetailController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};






const vendorUpdateController = async (req, res) => {
  try {
    const {
      vendorId,
      vendorName,
      vendorFirstName,
      vendorLastName,
      vendorPhoneMain,
      vendorPhoneDirect,
      vendorEmail,
      vendorWebsite,
      vendorAddress,
      vendorCity,
      vendorState,
      vendorZipCode,
      VendorType,
      vendorDealerShipBrand,
    } = req.body;

    const updateVendor = await vendors.findOneAndUpdate(
      { _id: vendorId }, // ✅ Fix: wrap vendorId in an object as a filter
      {
        vendorName,
        vendorFirstName,
        vendorLastName,
        vendorPhoneMain,
        vendorPhoneDirect,
        vendorEmail,
        vendorWebsite,
        vendorAddress,
        vendorCity,
        vendorState,
        vendorZipCode,
        VendorType,
        vendorDealerShipBrand,
      },
      { new: true } // ✅ Return the updated document
    );

    if (!updateVendor) {
      return res.status(404).json({
        success: false,
        msg: "Vendor not found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      msg: "Updated the Vendor",
      data: updateVendor,
    });
  } catch (error) {
    console.error("vendorUpdateController", error);
    res.status(500).json({
      success: false,
      err: error.message,
      data: [],
    });
  }
};

const vendorLogOut = async (req, res) => {
  try {
    const { shopId, userName } = req.params;
    const findVEndor = await vendors.findOneAndUpdate(
      { shopId, userName },
      { vendorActive: "Deactive" }
    );
    if (!findVEndor) {
      return res.status(404).json({
        sucess: false,
        msg: "Shop or user Not Found !",
      });
    }
    res.status(200).json({
      sucess: true,
      msg: "Log Out !",
    });
  } catch (error) {
    console.log("vendorLogOut", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const vendorSmsChangeController = async (req, res) => {
  try {
    const { phone, userId } = req.params;
    const otpGenerated = uuidv4();
    const expiryTime = Date.now() + 600000;
    const tokenWithExpiry = { token: otpGenerated, expiryTime: expiryTime };
    const message = await client.messages.create({
      body: `Hello from Twilio! Reset Password :-  http://localhost:5173/newPassword/${otpGenerated}`,
      from: "+12513124185",
      to: `+91${phone}`,
      contentType: "text/html",
    });
    await vendors.updateOne(
      { _id: userId },
      { $set: { newPasswordToken: tokenWithExpiry } }
    );
    res.status(200).json({
      success: true,
      msg: "SMS Sent!",
      data: message, // Optionally, you can include the Twilio response data
    });
  } catch (error) {
    console.error("Twilio Error:", error);

    // Check if the error is from Twilio
    if (error.code && error.code === 21211) {
      // Invalid 'To' Phone Number error
      res.status(400).json({
        success: false,
        error: "Invalid 'To' Phone Number",
        details: error.moreInfo, // Include more information if available
      });
    } else {
      // Other Twilio errors or general errors
      res.status(500).json({
        success: false,
        error: "Failed to send SMS",
        details: error.message, // Include error message
      });
    }
  }
};

const vendorChangePasswordController = async (req, res) => {
  try {
    const { newPassword, userId, token } = req.body;
    const findUser = await users.findById(userId);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found !!!",
      });
    }

    const newPasswordToken = findUser.newPasswordToken;

    if (
      newPasswordToken &&
      newPasswordToken.token === token &&
      newPasswordToken.expiryTime > Date.now()
    ) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hashSync(
        newPassword,
        saltRounds,
        process.env.ACCESS_TOKEN_SECRET
      );

      const updatedPassword = await vendors.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword, newPasswordToken: null } }
      );

      return res.status(200).json({
        success: true,
        msg: "Password has been Updated",
        data: updatedPassword,
      });
    }
    await vendors.updateOne(
      { _id: userId },
      { $set: { newPasswordToken: null } }
    );
    res.status(404).json({
      success: false,
      msg: "Token Expired or Invalid !!!",
    });
  } catch (error) {
    console.log("vendorChangePasswordController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

module.exports = {
  vendorRegisterController,
  vendorLogInController,
  vendorDetailController,
  vendorLogOut,
  vendorSmsChangeController,
  vendorChangePasswordController,
  vendorUpdateController,
};
