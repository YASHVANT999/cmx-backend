const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "Shop ID is required"],
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  vendorName: {
    type: String,
    default: "",
  },
  vendorFirstName: {
    type: String,
    default: "",
  },
  vendorLastName: {
    type: String,
    default: "",
  },
  vendorPhoneMain: {
    type: String,
    default: "",
  },
  vendorPhoneDirect: {
    type: String,
    default: "",
  },
  vendorEmail: {
    type: String,
    default: "",
    unique: true,
  },
  vendorWebsite: {
    type: String,
    default: "",
  },
  vendorAddress: {
    type: String,
    default: "",
  },
  vendorCity: {
    type: String,
    default: "",
  },
  vendorState: {
    type: String,
    default: "",
  },
  vendorZipCode: {
    type: String,
    default: "",
  },
  VendorType: {
    type: String,
    enum: [
      "Aftermarket",
      "Glass Sublet",
      "QRP (Quality Recycled Part",
      "OEM - Dealership",
      "Wheel Sublet",
    ],
  },
  vendorDealerShipBrand: {
    type: [String],
    enum: [
      "Acura",
      "Audi",
      "BMW",
      "Chrysler",
      "Ford",
      "GM",
      "Honda",
      "Hyundai",
      "Infiniti",
      "Isuzu",
      "Jaguar",
      "Kia",
      "LandRover",
      "Lexus",
      "Mazda",
      "Mercedes-Benz",
      "Mitsubishi",
      "Nissan",
      "Porsche",
      "Subaru",
      "Suzuki",
      "Toyota",
      "Volkswagen",
      "Volvo",
    ],
  },
  vendorActive: {
    type: String,
    enum: ["Active", "Deactive"],
  },
  newPasswordToken: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
