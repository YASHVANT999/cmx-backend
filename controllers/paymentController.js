const payments = require("../models/paymentModel");
const users = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const paymentRegisterController = async (req, res) => {
  let deletedFile = null;
  try {
    const {
      estimateId,
      staffId,
      paymentAmount,
      PaymentInfo,
      paymentFrom,
      verifiedDate,
    } = req.body;
    if (req.file) {
      deletedFile = req.file.filename;
    }
    const userFound = await users.findById(staffId);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        msg: "Staff Not Found !",
      });
    }
    const paymentData = await payments.findOneAndUpdate(
      {
        estimateId,
        "paymentDue.PaymentInfo": PaymentInfo,
        "paymentDue.paymentFrom": paymentFrom,
      },
      {
        $set: {
          // Use $set to update the fields of the matched element
          "paymentDue.$[element].paymentAmount": paymentAmount,
          "paymentDue.$[element].proofOfPayment": req.file.filename,
          "paymentDue.$[element].staffId": staffId,
          "paymentDue.$[element].verifiedDate": verifiedDate,
        },
      },
      {
        arrayFilters: [
          {
            "element.PaymentInfo": PaymentInfo,
            "element.paymentFrom": paymentFrom,
          },
        ],
        new: true, // Option: new - return the modified document
      }
    );
    if (!paymentData) {
      const emptyPaymentDue = [
        {
          PaymentInfo: "RecordOfEstimate",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "RecordOfEstimate",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Supplement1",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Supplement1",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Deductible",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Deductible",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "CustomerPay",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "CustomerPay",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Betterment",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Betterment",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "AppearanceAllowance",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "AppearanceAllowance",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Other",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "Other",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "TotalLossCharges",
          paymentFrom: "Customer",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
        {
          PaymentInfo: "TotalLossCharges",
          paymentFrom: "Insurance",
          paymentAmount: 0,
          proofOfPayment: "",
          staffId: userFound._id,
          verifiedDate: Date.now(),
        },
      ];
      const filterArray = emptyPaymentDue.filter((item) =>
        item.PaymentInfo !== PaymentInfo
          ? item.paymentFrom !== paymentFrom
            ? true
            : true
          : item.paymentFrom !== paymentFrom
      );
      filterArray.push({
        PaymentInfo,
        paymentFrom,
        paymentAmount,
        proofOfPayment: req.file.filename,
        staffId,
        verifiedDate,
      });
      const paymentData = await payments.create({
        estimateId,
        paymentDue: filterArray,
      });
      return res.status(200).json({
        success: true,
        msg: "Payment has been Made !",
        data: paymentData,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Payment has been Updated !",
      data: paymentData,
    });
  } catch (error) {
    console.log("paymentRegisterController", error);
    if (deletedFile) {
      fs.unlinkSync(path.join(__dirname, `../public/payment/${deletedFile}`));
    }
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const getPaymentController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const findPayment = await payments.find({ estimateId });
    if (findPayment.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Payment Not Found !",
        data: [],
      });
    }
    const paymentInfoGroups = findPayment[0]?.paymentDue?.reduce(
      (acc, item) => {
        const key = `${item.paymentFrom} - ${item.PaymentInfo}`;
        acc[key] = (acc[key] || 0) + item.paymentAmount;
        return acc;
      },
      {}
    );

    const customerPaymentInfoSums = Object.keys(paymentInfoGroups)
      .filter((key) => key.startsWith("Customer"))
      .reduce((acc, key) => {
        const [_, paymentInfo] = key.split(" - ");
        acc[paymentInfo] = paymentInfoGroups[key];
        return acc;
      }, {});

    const insurancePaymentInfoSums = Object.keys(paymentInfoGroups)
      .filter((key) => key.startsWith("Insurance"))
      .reduce((acc, key) => {
        const [_, paymentInfo] = key.split(" - ");
        acc[paymentInfo] = paymentInfoGroups[key];
        return acc;
      }, {});

    const customerTotal = findPayment[0]?.paymentDue?.reduce((acc, item) => {
      if (item.paymentFrom === "Customer") {
        return acc + item.paymentAmount;
      }
      return acc;
    }, 0);

    const insuranceTotal = findPayment[0]?.paymentDue?.reduce((acc, item) => {
      if (item.paymentFrom === "Insurance") {
        return acc + item.paymentAmount;
      }
      return acc;
    }, 0);
    const updatedPayment = {
      ...findPayment[0],
      customerSpecificData: customerPaymentInfoSums,
      InsuranceSpecificData: insurancePaymentInfoSums,
      customerTotal: customerTotal,
      InsuranceTotal: insuranceTotal,
      total: customerTotal + insuranceTotal,
    };
    res.status(200).json({
      success: true,
      msg: "Payment Found !",
      data: updatedPayment,
    });
  } catch (error) {
    console.log("getPaymentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = { paymentRegisterController, getPaymentController };
