const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "Shop ID is required"],
    // unique:true,
  },
  email: {
    type: String,
    // required: [true, "Email is required and should be true!"],
    unique: true,
  },
  userName: {
    type: String,
    // required: [true, "Email is required and should be true!"],
  },
  password: {
    type: String,
    // required: [true, "password is required"],
  },
  showPassword: {
    type: String,
    // required: [true, "password is required"],
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  phone2: {
    type: String,
    default: "",
  },
  note1: {
    type: String,
    default: "",
  },
  note2: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  hireDate: {
    type: String,
    default: "",
  },
  terminationDate: {
    type: String,
    default: "",
  },
 employeeTile: {
    type: String,
    enum: [
      "CEO",
      "Owner",
      "NVP",
      "RVP",
      "COO",
      "Director",
      "Controller",
      "Administrative",
      "Accountant",
      "Office",
      "Shop Foreman",
      "Shop Manager",
      "Estimator",
      "Parts",
      "Body Technician",
      "Frame Technician",
      "Painter",
      "Detailer Technician",
      "Paint Prepper",
      "Maintenance Technician",
      "Parts Delivery Driver",
      "Shop Helper"
    ],
    required: false
  },
  dob: {
    type: String,
    default: "",
  },
  permissions: {
    type: [String],
    default: [],
  },
  notification: {
    type: [String],
    default: [],
  },
  notificationDelivery: [
    {
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
    },
  ],
  payTerm: {
    type: String,
    default: "",
  },
  payType: {
    type: String,
    default: "",
  },
  flatRate: {
    type: String,
    default: "",
  },
  payPerHourly: {
    type: String,
    default: "",
  },
  Salary: {
    type: String,
    default: "",
  },
  commissionCategories: {
    type: [String],
    default: [],
  },
  commissionRate: {
    type: String,
    default: "",
  },
  gross: {
    type: String,
    default: "",
  },
  newPasswordToken: {
    token: {
      type: String,
      default: "",
    },
    expiryTime: {
      type: Date,
    },
  },
  websiteStatue: {
    type: String,
    default: "",
  },
  activeStatue: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
