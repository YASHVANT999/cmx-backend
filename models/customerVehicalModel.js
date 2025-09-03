const mongoose = require("mongoose");

const customerVehicalSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: [true, "cuatomer ID is required"],
  },
  vin: {
    type: String,
    default: "",
  },
  year: {
    type: String,
    default: "",
  },
  make: {
    type: String,
    default: "",
  },
  model: {
    type: String,
    default: "",
  },
  engine: {
    type: String,
    default: "",
  },
  exteriorColor: {
    type: String,
    default: "",
  },
  vehicalTow: {
    type: String,
    default: "",
  },
  priorityDamage: {
    type: String,
    default: "",
  },
  exteriorCode: {
    type: String,
    default: "",
  },
  interiorColor: {
    type: String,
    default: "",
  },
  trimCode: {
    type: String,
    default: "",
  },
  vehicleCondition: {
    type: String,
    default: "",
  },
  odometer: {
    type: String,
    default: "",
  },
  productionDate: {
    type: String,
    default: "",
  },
  licensePlate: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  plate: {
    type: String,
    default: "",
  },
  plateState: {
    type: String,
    default: "",
  },
  milegeIn: {
    type: String,
    default: "",
  },
  milegeOut: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  impactReport: {
    type: String,
    default: "",
  },
  PointOfImpact: {
    FrontCenter: {
      type: Boolean,
      default: false,
    },
    RTFront: {
      type: Boolean,
      default: false,
    },
    RTSide: {
      type: Boolean,
      default: false,
    },
    RTRear: {
      type: Boolean,
      default: false,
    },
    RearCenter: {
      type: Boolean,
      default: false,
    },
    LTRear: {
      type: Boolean,
      default: false,
    },
    LTSide: {
      type: Boolean,
      default: false,
    },
    LTFront: {
      type: Boolean,
      default: false,
    },
    Windshield: {
      type: Boolean,
      default: false,
    },
    Top: {
      type: Boolean,
      default: false,
    },
  },
  fuelsMark: {
    type: Boolean,
    default: false,
  },
  fuelsFilled: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const customerVehicalModel = mongoose.model(
  "customervehicals",
  customerVehicalSchema
);

module.exports = customerVehicalModel;
