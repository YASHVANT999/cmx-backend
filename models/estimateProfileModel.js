const mongoose = require("mongoose");

const estimateProfileSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: [true, "Customer ID is required"],
    },
    vehicalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicals",
      unique: true,
      required: [true, "vehicals ID is required"],
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user ID is required"],
    },
    insuranceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "insurances",
      // sparse: true,
      // index: { unique: true, partialFilterExpression: { insuranceId: { $ne: null } } }
    },
    estimateId: {
      type: String,
      unique: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: [true, "shop ID is required"],
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
    email: {
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
    companyName: {
      type: String,
      default: "",
    },
    vehicalDrivable: {
      type: String,
      default: "",
    },
    needsTow: {
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
    exteriorColor: {
      type: String,
      default: "",
    },
    payForDamage: {
      type: String,
      default: "",
    },
    vin: {
      type: String,
      default: "",
    },
    repairVehical: {
      type: String,
      default: "",
    },
    howSoon: {
      type: String,
      default: "",
    },
    beenHereBefore: {
      type: String,
      default: "",
    },
    reference: {
      type: String,
      default: "",
    },
    primary_image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "estimateprofilePhotos",
    },
    photoExpress: {
      type: [
        {
          gallery_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "estimateprofilePhotos",
          },
          filename: {
            type: String,
            required: [true, "The filename is required"],
          },
          fileField: {
            type: String,
            required: [true, "The fileField is required"],
          },
        },
      ],
      default: [],
    },
    eSignatures: {
      type: String,
      default: "",
    },
    eSignaturesDate: {
      type: String,
      default: "",
    },
    eSignaturesStaffId: {
      type: String,
    },
    eSignatureAuthorizationSigned: {
      type: String,
      enum: ["", "Electronic Signature", "Wet Signature"],
    },
    textArea: [
      {
        text1: {
          type: String,
          default: "",
        },
        text2: {
          type: String,
          default: "",
        },
        text3: {
          type: String,
          default: "",
        },
      },
    ],
    total: {
      type: String,
      default: "",
    },
    estimatorDate: {
      type: Date,
      default: "",
    },
    estimateToken: {
      type: String,
      default: "",
    },
    owner: {
      type: String,
      default: "",
    },
    driver: {
      type: String,
      default: "",
    },
    repairOrder: {
      type: Boolean,
      default: false,
    },
    Archived: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    StatusUpdate: {
      Arrived: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      EstimateApproved: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      PartsOrdered: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      PartsArrived: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      RepairPlan: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      SupplementHold: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      SupplmentApproved: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      BodyFrame: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      Mechanical: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      Paint: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      Reassembly: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      ADASMechanical: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      Detail: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      ReadyforPickup: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      Delivered: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
      PaidInFull: {
        type: String,
        enum: [
          "",
          "Default",
          "Not Apply",
          "Needs Action",
          "Processed",
          "Completed",
        ],
        default: "Default",
      },
    },
    estimateStaff: {
      EstimatorStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      BodyTechStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      PainterStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      FrameTechStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      DetailTechStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      OfficeStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
      ProductMangStaff: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    paymentAmount: {
      type: [
        {
          key: {
            type: String,
            required: [true, "Key is Required"],
          },
          paymentFrom: {
            type: String,
            enum: ["Customer", "Insurance", "", null],
            default: "Customer",
          },
          paymentAmountDue: {
            type: String,
            default: "0.00",
          },
          paymentproofOfPayment: {
            type: String,
          },
          postPayment: {
            type: String,
            default: "0.00",
          },
          PaymentType: {
            type: String,
          },
          transaction: {
            type: String,
          },
          creditCardType: {
            type: String,
          },
          staffId: {
            type: String,
          },
          verifiedDate: {
            type: String,
          },
          payments: {
            type: [
              {
                paymentAmount: {
                  type: String,
                  default: "0.00",
                },
                PaymentType: {
                  type: String,
                },
                Transaction: {
                  type: String,
                },
                DocumentIds: {
                  type: Array,
                  default: [],
                },
                VerifiedDate: {
                  type: String,
                },
                staffId: {
                  type: String,
                },
                created_at: {
                  type: Date,
                  default: Date.now,
                },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
    extraPhotes: {
      type: [
        {
          Id: {
            type: String,
          },
          gallery_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "estimateprofilePhotos",
          },
          name: {
            type: String,
          },
          type: {
            type: String,
          },
          date: {
            type: String,
          },
          size: {
            type: String,
          },
          src: {
            type: String,
          },
          dsc: {
            type: String,
          },
          is_primary: {
            type: Boolean,
            default: false,
          },
          photoName: {
            type: String,
            required: true,
          },
          imageDescription: {
            type: String,
          },
          created_at: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    photesGalleries: {
      type: Array,
      default: [],
    },
    Activity: {
      lastUsersId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      lastActivity: {
        type: Date,
      },
    },
    popFile: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    followUpStaff: {
      type: String,
      default: "",
    },
    followUpDate: {
      type: String,
      default: "",
    },
    otpPermission: {
      type: Boolean,
      default: false,
    },
    smsPermission: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    statics: {
      generateEstimateId() {
        let counter = "00001";
        return this.findOne({ estimateId: { $regex: /^E\d{5}$/ } })
          .sort("-estimateId")
          .then((lastEstimate) => {
            if (lastEstimate) {
              const lastCounter = parseInt(lastEstimate.estimateId.slice(1));
              counter = Math.max(counter, lastCounter + 1);
            }
            return `E${counter.toString().padStart(5, "0")}`;
          });
      },
    },
  }
);

estimateProfileSchema.pre("save", function (next) {
  if (!this.estimateId) {
    this.constructor.generateEstimateId().then((estimateId) => {
      this.estimateId = estimateId;
      next();
    });
  } else {
    next();
  }
});

const estimateProfileModel = mongoose.model(
  "estimateprofiles",
  estimateProfileSchema
);

module.exports = estimateProfileModel;
