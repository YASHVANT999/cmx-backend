const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, "Shop Name is required"],
    },
    shopId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
    },
    address: {
      type: String,
      required: [true, "Shop Address is required"],
    },
    city: {
      type: String,
      required: [true, "city Address is required"],
      default: "",
    },
    state: {
      type: String,
      required: [true, "state Address is required"],
      default: "",
    },
    zipCode: {
      type: String,
      // required:[true,'Zip Code is required'],
      default: "",
    },
    country: {
      type: String,
      required: [true, "country is required"],
      default: "",
    },
    dateFormat: {
      type: String,
      required: [true, "date Format is required"],
      default: "",
    },
    timeZone: {
      type: String,
      required: [true, "timeZone is required"],
      default: "",
    },
    timeFormat: {
      type: String,
      enum: ["United States", "United Kingdom", "USA"],
      required: [true, "timeFormat is required"],
    },
    websiteStatue: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      // required:[true,'website is required'],
      default: "",
    },
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      default: "",
    },
    shopLogo: {
      type: String,
      //   required: [true, "shopLogo is required"],
      default: "",
    },
    adminContactName: {
      type: String,
      //   required: [true, "shopLogo is required"],
      default: "",
    },
    adminContactPhone: {
      type: String,
      //   required: [true, "shopLogo is required"],
      default: "",
    },
    adminEmail: {
      type: String,
      //   required: [true, "shopLogo is required"],
      default: "",
    },
    phone1: {
      type: String,
      required: [true, "phone1 is required"],
      default: "",
    },
    phone2: {
      type: String,
      // required:[true,'phone2 is required'],
      default: "",
    },
    fax: {
      type: String,
      // required:[true,'fax is required'],
      default: "",
    },
    EstimateDefault: {
      Estimator: {
        type: String,
        default: "",
      },
      Insurance: {
        type: String,
        default: "",
      },
      Days: {
        type: String,
        default: "",
      },
    },
    estimateDefaultAssign: {
      type: Boolean,
      default: false,
    },
    repairOrderDefaultAssign: {
      type: Boolean,
      default: false,
    },
    RepairOrderDefault: {
      Estimator: {
        type: String,
        default: "",
      },
      Insurance: {
        type: String,
        default: "",
      },
      Days: {
        type: String,
        default: "",
      },
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    statics: {
      generateShopId() {
        let counter = "00001";
        return this.findOne({ shopId: { $regex: /^S\d{5}$/ } })
          .sort("-shopId")
          .then((lastShop) => {
            if (lastShop) {
              const lastCounter = parseInt(lastShop.shopId.slice(1));
              counter = Math.max(counter, lastCounter + 1);
            }
            return `S${counter.toString().padStart(5, "0")}`;
          });
      },
    },
  }
);

shopSchema.pre("save", function (next) {
  if (!this.shopId) {
    this.constructor.generateShopId().then((shopId) => {
      this.shopId = shopId;
      next();
    });
  } else {
    next();
  }
});

const shopModel = mongoose.model("shops", shopSchema);

module.exports = shopModel;
