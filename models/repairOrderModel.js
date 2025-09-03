const mongoose = require("mongoose");

const repairOrderSchema = mongoose.Schema(
  {
    estimateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "estimateprofiles",
      unique: true,
    },
    Archived: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    repairOrdreId: {
      type: String,
      unique: true,
    },
  },
  {
    statics: {
      generateRepairOrderId() {
        return this.findOne({ repairOrdreId: { $regex: /^\d{6}$/ } })
          .sort({ repairOrdreId: -1 })
          .then((lastRepairOrder) => {
            let counter = 1;
            if (lastRepairOrder) {
              const lastCounter = parseInt(lastRepairOrder.repairOrdreId);
              counter = lastCounter + 1;
            }
            return counter.toString().padStart(6, "0");
          });
      },
    },
  }
);

repairOrderSchema.pre("save", function (next) {
  if (!this.repairOrdreId) {
    this.constructor.generateRepairOrderId().then((repairOrdreId) => {
      this.repairOrdreId = repairOrdreId;
      next();
    });
  } else {
    next();
  }
});

const repairOrdereModel = mongoose.model("repairOrders", repairOrderSchema);

module.exports = repairOrdereModel;
