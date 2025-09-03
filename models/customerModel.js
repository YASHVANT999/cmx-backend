const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: [true, "Shop ID is required"],
    },
    customerId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    owner: {
      type: String,
      default: "",
    },
    driver: {
      type: String,
      default: "",
    },
    relationship: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    phone2: {
      type: String,
      required: [true, "phone2 is required"],
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
      enum: ["", "France"],
      default: "",
    },
    companyName: {
      type: String,
      default: "",
    },
    familyMembers: {
      type: [
        {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
          },
          phone2: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          owner: {
            type: String,
            default: "",
          },
          driver: {
            type: String,
            default: "",
          },
          relationship: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    statics: {
      generateCustomerId() {
        let counter = '1001';
        return this.findOne({ customerId: { $regex: /^C\d{5}$/ } })
          .sort("-customerId")
          .then((lastCustomer) => {
            if (lastCustomer) {
              const lastCounter = parseInt(lastCustomer.customerId.slice(1));
              counter = Math.max(counter, lastCounter + 1);
            }
            return `C${counter.toString().padStart(5, "0")}`;
          });
      },
    },
  }
);

customerSchema.pre("save", function (next) {
  if (!this.customerId) {
    this.constructor.generateCustomerId().then((customerId) => {
      this.customerId = customerId;
      next();
    });
  } else {
    next();
  }
});

const customerModel = mongoose.model("customers", customerSchema);

module.exports = customerModel;
