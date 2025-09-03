const users = require("../models/userModel");
const shops = require("../models/shopModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const generateAccessToken = require("../middleware/generateAccessToken");
const accountSid = "AC2c6bf8f3dd5763b9585e673980411a6f";
const authToken = "a10413900b307103c378abc2a4b59416";
const client = require("twilio")(accountSid, authToken);
const { ObjectId } = require("mongodb");

const loginController = async (req, res) => {
  try {
    const { username, password, shopId } = req.body;
    console.log("body>>", req.body);
    const shopData = await shops.findOne({
      shopId: { $regex: shopId, $options: "i" },
    });
    if (!shopData) {
      return res.status(404).json({
        success: false,
        msg: "Wrong ShopId",
        data: [],
      });
    }
    
    const userFound = await users
      .findOne({
        $or: [{ email: username }, { userName: username }],
        shopId: shopData._id,
      })
      .populate({
        path: "shopId",
        model: "shops",
      });
    if (!userFound || userFound?.length <= 0) {
      return res
        .status(404)
        .send({ success: false, msg: "Username not Found!", data: [] });
    } else {
      const hashedPassword = userFound.password;
      if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful");
        const token = generateAccessToken(userFound);
        // console.log(token)
        const { password, ...responseData } = userFound.toObject();
        return res.status(200).send({
          success: true,
          msg: "Login Successful !!!",
          data: responseData,
          token: token,
        });
      } else {
        console.log("---------> Password Incorrect");
        // res.send("Password incorrect!")
        res
          .status(404)
          .send({ success: false, msg: "Password incorrect!", data: [] });
      }
    }
  } catch (error) {
    console.log("loginController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const registerController = async (req, res) => {
  try {
    const {
      shopId,
      email,
      userName,
      password,
      firstName,
      lastName,
      phone,
      phone2,
      address,
      city,
      state,
      zipCode,
      country,
      hireDate,
      terminationDate,
      dob,
      permissions,
      notification,
      notificationDelivery,
      payTerm,
      payType,
      flatRate,
      payPerHourly,
      Salary,
      commissionCategories,
      commissionRate,
      gross,
      employeeTile,
      note1,
      note2,
      activeStatue,
    } = req.body;
    const checkShop = await shops.findById(shopId);
    if (!checkShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop not available!!",
        data: [],
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        msg: "Email not found – email is required!",
        data: [],
      });
    }
    const checkEmail = await users.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .send({ success: false, msg: "Duplicate Email!", data: [] });
    } else {
      let showPassword = false;
      let hashedPassword = null;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hashSync(
          password,
          saltRounds,
          process.env.ACCESS_TOKEN_SECRET
        );

        const secretKey = process.env.SECRET_KEY.padEnd(32, '0').slice(0, 32); // Ensure 32 bytes
        const iv = crypto.randomBytes(16); // 16 bytes for AES

        const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secretKey), iv);
        let encrypted = cipher.update(password, "utf8", "hex");
        encrypted += cipher.final("hex");

        // Store both IV and encrypted password (e.g., as JSON)
        showPassword = JSON.stringify({
          iv: iv.toString("hex"),
          content: encrypted
        });
      }

      
      const insertUser = await users.create({
        shopId,
        email,
        userName,
        showPassword: showPassword,
        firstName,
        lastName,
        phone,
        phone2,
        address,
        city,
        state,
        zipCode,
        country,
        hireDate,
        terminationDate,
        dob,
        permissions,
        notification,
        notificationDelivery,
        payTerm,
        payType,
        flatRate,
        payPerHourly,
        Salary,
        commissionCategories,
        commissionRate,
        gross,
        password: hashedPassword,
        employeeTile,
        note1,
        note2,
        activeStatue,
      });
      const token = generateAccessToken(email);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: insertUser.email,
        subject: "Welcome to CMX - Your Account Details",
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to CMX</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-size: 18px;
                  }

                  .container {
                    max-width: 600px;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }

                  h2 {
                    color: #333333;
                    margin-top: 0;
                  }

                  p {
                    margin-bottom: 20px;
                    line-height: 1.6;
                    color: #555555;
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
                    color: #666666;
                  }

                  .credentials {
                    background-color: #f9f9f9;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                  }

                  .credentials p {
                    margin: 5px 0;
                  }

                  .signature {
                    margin-top: 20px;
                    border-top: 1px solid #e0e0e0;
                    padding-top: 20px;
                    color: #777777;
                  }
                </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Welcome to CMX</h2>
                    <p>Dear ${insertUser.firstName},</p>
                    <p>Welcome to CMX! We are excited to have you on board.</p>
                    <div class="credentials">
                      <p><strong>Here are your login details:</strong></p>
                      <p>Shop ID: <strong>${checkShop.shopId}</strong></p>
                      <p>Username: <strong>${insertUser.userName}</strong></p>
                      <p>Password: <strong>${password}</strong></p>
                    </div>
                    <p>You can log in to your account at <a href="${process.env.FRONT_LINK}/login">${process.env.FRONT_LINK}/login</a>.</p>
                    <div class="signature">
                      <p>Best regards,</p>
                      <p>Mike Lopez</p>
                      <p>CEO at CollisionMateX</p>
                      <p>a CMX Company</p>
                    </div>
                  </div>
                </body>
                </html>
                `,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send({
        success: true,
        msg: "Staff Successfully added!",
        data: insertUser,
        token,
      });
    }
  } catch (error) {
    console.log("registerController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const userdetailsController = async (req, res) => {
  let user_id = req.params.id;
  try {
    let getUserDetail = await users.findById(user_id, { _id: 0 }).populate({
      path: "shopId",
      model: "shops",
    });
    if (getUserDetail.length <= 0) {
      return res
        .status(404)
        .send({ success: false, msg: "id not Found!", data: [] });
    }
    getUserDetail.showPassword = decryptShowPassword(
      getUserDetail?.showPassword
    );
    res
      .status(200)
      .json({ success: true, msg: "User Found", data: getUserDetail });
  } catch (error) {
    console.log("userdetailsController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const addUserDetailController = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      phone,
      phone2,
      address,
      city,
      state,
      zipCode,
      country,
      companyName,
    } = req.body;
    users
      .updateOne(
        { _id: userId },
        {
          $set: {
            firstName,
            lastName,
            phone,
            phone2,
            address,
            city,
            state,
            zipCode,
            country,
            companyName,
          },
        }
      )
      .then(() =>
        res.status(200).json({ success: true, msg: "User Data Updated" })
      )
      .catch((error) =>
        res.status(404).json({
          success: false,
          err: error,
          data: [],
        })
      );
  } catch (error) {
    console.log("addUserDetailController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updateData = {};

    if (req.body.email) updateData.email = req.body.email;
    if (req.body.userName) updateData.userName = req.body.userName;
    if (req.body.password) updateData.password = req.body.password;
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.phone) updateData.phone = req.body.phone;
    updateData.phone2 = req.body.phone2;
    if (req.body.address) updateData.address = req.body.address;
    if (req.body.city) updateData.city = req.body.city;
    if (req.body.state) updateData.state = req.body.state;
    if (req.body.zipCode) updateData.zipCode = req.body.zipCode;
    if (req.body.country) updateData.country = req.body.country;
    if (req.body.hireDate) updateData.hireDate = req.body.hireDate;
    if (req.body.terminationDate)
      updateData.terminationDate = req.body.terminationDate;
    if (req.body.dob) updateData.dob = req.body.dob;
    if (req.body.permissions) updateData.permissions = req.body.permissions;
    if (req.body.notification) updateData.notification = req.body.notification;
    if (req.body.notificationDelivery)
      updateData.notificationDelivery = req.body.notificationDelivery;
    if (req.body.payTerm) updateData.payTerm = req.body.payTerm;
    if (req.body.payType) updateData.payType = req.body.payType;
    if (req.body.flatRate) updateData.flatRate = req.body.flatRate;
    if (req.body.payPerHourly) updateData.payPerHourly = req.body.payPerHourly;
    if (req.body.Salary) updateData.Salary = req.body.Salary;
    if (req.body.commissionCategories)
      updateData.commissionCategories = req.body.commissionCategories;
    if (req.body.commissionRate)
      updateData.commissionRate = req.body.commissionRate;
    if (req.body.gross) updateData.gross = req.body.gross;
    if (req.body.employeeTile) updateData.employeeTile = req.body.employeeTile;
    if (req.body.note1) updateData.note1 = req.body.note1;
    if (req.body.note2) updateData.note2 = req.body.note2;
    updateData.activeStatue = req.body.activeStatue;

    const checkuser = await users.findById(userId);
    if (!checkuser) {
      return res.status(404).json({
        success: false,
        msg: "User not Found!!",
        data: [],
      });
    }

    const gotData = await users.updateMany(
      { _id: userId },
      { $set: updateData }
    );

    res.status(200).json({
      success: true,
      msg: "Saved!",
      data: gotData,
    });
  } catch (error) {
    console.log("updateUserController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const loginAssistanceController = async (req, res) => {
  try {
    const { Username, shopId } = req.body;
    if (
      !shopId ||
      !Username ||
      Username.trim() === "" ||
      shopId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        msg: "Username not present",
        data: [],
      });
    }
    const shopData = await shops.findOne({
      shopId: { $regex: shopId, $options: "i" },
    });
    if (!shopData) {
      return res.status(404).json({
        success: false,
        msg: "Wrong ShopId",
        data: [],
      });
    }
    const getData = await users.findOne({
      $or: [{ email: Username }, { userName: Username }],
      shopId: shopData._id,
    });
    if (!getData || getData?.length <= 0) {
      return res
        .status(404)
        .send({ success: false, msg: "Username not Found!", data: [] });
    } else {
      let passwordLength = 10;
      let randomPassword = generateRandomPassword(passwordLength);
      let saltRounds = 10;
      let password = randomPassword;
      let hashedPassword = await bcrypt.hashSync(
        password,
        saltRounds,
        process.env.ACCESS_TOKEN_SECRET
      );

      const updatedPassword = await users.updateOne(
        { _id: getData._id },
        { $set: { password: hashedPassword, newPasswordToken: null } }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: getData.email,
        subject: `Password Reset for Your CollisionMateX Account`,
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-size: 18px;
                  }

                  .container {
                    max-width: 600px;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }

                  h2 {
                    color: #333333;
                    margin-top: 0;
                  }

                  p {
                    margin-bottom: 20px;
                    line-height: 1.6;
                    color: #555555;
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
                    color: #666666;
                  }

                  .credentials {
                    background-color: #f9f9f9;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                  }

                  .credentials p {
                    margin: 5px 0;
                  }

                  .signature {
                    margin-top: 20px;
                    border-top: 1px solid #e0e0e0;
                    padding-top: 20px;
                    color: #777777;
                  }
                </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Password Reset</h2>
                    <p>Dear ${getData.firstName},</p>
                    <p>Your password has been successfully reset. Here are your new login details:</p>
                    <div class="credentials">
                      <p>Shop ID: <strong>${shopData.shopId}</strong></p>
                      <p>Username: <strong>${getData.userName}</strong></p>
                      <p>Temporary Password: <strong>${randomPassword}</strong></p>
                    </div>
                    <p>Please log in to your account at <a href="${process.env.FRONT_LINK}/login">${process.env.FRONT_LINK}/login</a> using the temporary password provided above. For security reasons, you will be prompted to create a new password upon your first login.</p>
                    <p>If you did not request this password reset or have any questions, please contact our support team immediately.</p>
                    <p>Thank you for using CollisionMateX!</p>
                    <div class="signature">
                      <p>Best regards,</p>
                      <p>Mike Lopez</p>
                      <p>CEO</p>
                      <p>CollisionMateX</p>
                      <p>a CMX Company</p>
                    </div>
                  </div>
                </body>
                </html>
            `,
      };
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        msg: "Temprary password has been sent on mail",
        data: updatedPassword,
      });
    }
  } catch (error) {
    console.log("loginAssistanceController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};
const sendOtpController = async (req, res) => {
  try {
    const { email, userId } = req.params;
    const otpGenerated = uuidv4();
    const expiryTime = Date.now() + 600000;
    const tokenWithExpiry = { token: otpGenerated, expiryTime: expiryTime };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
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
          <h2>Password Reset</h2>
          <p>Dear User,</p>
          <p>You have requested a password reset for your account. Please click the link below to reset your password:</p>
          <p><a href="http://localhost:5173/newPassword/${otpGenerated}">Reset Password</a></p>
          <p class="note"><strong>Note:</strong> This link will be valid for the next 10 minutes only.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions);
    await users.updateOne(
      { _id: userId },
      { $set: { newPasswordToken: tokenWithExpiry } }
    );
    res.status(200).json({
      success: true,
      msg: "Otp Send Successfully Check Your Mail !!!",
    });
  } catch (error) {
    console.log("changePasswordController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some Error Occured",
      data: [],
    });
  }
};

const changePasswordController = async (req, res) => {
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

      const updatedPassword = await users.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword, newPasswordToken: null } }
      );

      return res.status(200).json({
        success: true,
        msg: "Password has been Updated",
        data: updatedPassword,
      });
    }
    await users.updateOne(
      { _id: userId },
      { $set: { newPasswordToken: null } }
    );
    res.status(404).json({
      success: false,
      msg: "Token Expired or Invalid !!!",
    });
  } catch (error) {
    console.log("changePasswordController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const userSmsChangeController = async (req, res) => {
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
    // await users.updateOne(
    //   { _id: userId },
    //   { $set: { newPasswordToken: tokenWithExpiry } }
    // );
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

const getUserOfShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const foundShop = await shops.findById(shopId);
    if (!foundShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !",
      });
    }
    const allUsersData = await users.aggregate([
      { $match: { shopId: new ObjectId(shopId) } },
      {
        $group: {
          _id: "$employeeTile",
          users: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          employeeTile: "$_id",
          StaffList: "$users",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Your Staff !",
      data: allUsersData,
    });
  } catch (error) {
    console.log("getUserOfShopController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some Error Occured",
      data: [],
    });
  }
};

const getShopEstimatorController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const estimaterFound = await users.find({
      shopId,
      employeeTile: "Estimator",
    });
    res.status(200).json({
      success: true,
      msg: "Estimator of the shop !!!",
      data: estimaterFound,
    });
  } catch (error) {
    console.log("getShopEstimatorController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some Error Occured",
      data: [],
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const userFound = await users.find({
      shopId,
    });
    res.status(200).json({
      success: true,
      msg: "User Found !!!",
      data: userFound,
    });
  } catch (error) {
    console.log("getAllUserController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some Error Occured",
      data: [],
    });
  }
};

const getAllDeactiveController = async (req, res) => {
  try {
    const { shopId, page } = req.params;
    const limitMap = {
      1: 10,
      2: 25,
      3: 50,
      4: 100,
    };
    const shopFind = await shops.findById(shopId);
    if (!shopFind) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const userFound = await users
      .find({ shopId, activeStatue: false })
      .limit(limitMap[page]);
    res.status(200).json({
      success: true,
      msg: "Deactive Users Found !!!",
      data: userFound,
    });
  } catch (error) {
    console.log("getAllDeactiveController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some Error Occured",
      data: [],
    });
  }
};

module.exports = {
  loginController,
  loginAssistanceController,
  registerController,
  userdetailsController,
  addUserDetailController,
  updateUserController,
  sendOtpController,
  changePasswordController,
  userSmsChangeController,
  getUserOfShopController,
  getShopEstimatorController,
  getAllUserController,
  getAllDeactiveController,
};
// Method 1: Simple Random Password
function generateRandomPassword(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

const decryptShowPassword = (showPassword) => {
  if (showPassword && typeof showPassword === 'string') {
    showPassword = JSON.parse(showPassword);
  }
  if (showPassword) {
    const secretKey = process.env.SECRET_KEY.padEnd(32, '0').slice(0, 32);
    const iv = Buffer.from(showPassword.iv, "hex");
    const encryptedText = showPassword.content;
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
};
