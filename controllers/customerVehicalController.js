const customerVehical = require("../models/customerVehicalModel");
const shops = require("../models/shopModel");
const customers = require("../models/customerModel");
const { ObjectId } = require("mongodb");

const customerVehicalRegesterController = async (req, res) => {
  try {
    const {
      customerId,
      vin,
      year,
      make,
      model,
      engine,
      exteriorColor,
      exteriorCode,
      interiorColor,
      trimCode,
      vehicleCondition,
      odometer,
      productionDate,
      licensePlate,
      state,
      vehicalTow,
      priorityDamage,
      milegeIn,
      milegeOut,
      country,
      fuelsFilled,
      fuelsMark,
    } = req.body;
    const customerData = await customers.find({ customerId });
    if (!customerData) {
      return res.status(404).send({
        sucess: false,
        msg: "There is no such customer Found!!!",
        data: [],
      });
    } else {
      const customerData = await customerVehical.create({
        customerId,
        vin,
        year,
        make,
        model,
        engine,
        exteriorColor,
        exteriorCode,
        interiorColor,
        trimCode,
        vehicleCondition,
        odometer,
        productionDate,
        licensePlate,
        state,
        vehicalTow,
        priorityDamage,
        milegeIn,
        milegeOut,
        country,
        fuelsFilled,
        fuelsMark,
      });
      res.status(200).json({
        success: true,
        msg: "The vehical has been added !!!",
        data: customerData,
      });
    }
  } catch (error) {
    console.log("customerVehicalRegesterController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerVehicalController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerVehicalData = await customers.aggregate([
      {
        $match: {
          _id: new ObjectId(customerId),
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "_id",
          foreignField: "customerId",
          as: "customerVehicals",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "The vehicles have been found",
      data: customerVehicalData,
    });
  } catch (error) {
    console.log("customerVehicalController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};
//alt
// const customerVehicalController = async (req, res) => {
//     try {
//       const { customerId } = req.params;
//       console.log(customerId);
//       const customerVehicalData = await customerVehical.find({customerId});
//       res.status(200).json({
//         success: true,
//         msg: "The vehicles have been found",
//         data: customerVehicalData,
//       });
//     } catch (error) {
//       console.log("customerVehicalController", error);
//       res.status(500).json({
//         success: false,
//         err: error,
//         data: [],
//       });
//     }
//   };

const customerVehicalDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const customerDetail = await customerVehical.findById(id);
    if (!customerDetail) {
      res.status(404).json({
        success: false,
        msg: "Customer Detail Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Customer Detail Found !!!",
      data: customerDetail,
    });
  } catch (error) {
    console.log("customerVehicalDetailController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerVehicalUpdateController = async (req, res) => {
  try {
    const {
      vehicalId,
      vin,
      year,
      make,
      model,
      engine,
      exteriorColor,
      vehicalTow,
      priorityDamage,
      exteriorCode,
      interiorColor,
      trimCode,
      vehicleCondition,
      odometer,
      productionDate,
      licensePlate,
      state,
      plate,
      plateState,
      milegeIn,
      milegeOut,
      country,
      impactReport,
      fuelsFilled,
      fuelsMark,
    } = req.body;
    const findVehical = await customerVehical.findByIdAndUpdate(
      vehicalId,
      {
        $set: {
          vin,
          year,
          make,
          model,
          engine,
          exteriorColor,
          vehicalTow,
          priorityDamage,
          exteriorCode,
          interiorColor,
          trimCode,
          vehicleCondition,
          odometer,
          productionDate,
          licensePlate,
          state,
          plate,
          plateState,
          milegeIn,
          milegeOut,
          country,
          impactReport,
          fuelsFilled,
          fuelsMark,
        },
      },
      { new: true }
    );
    if (!findVehical) {
      return res.status(404).json({
        success: false,
        msg: "The Vehical is Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "The Vehical Data has Been Updated !",
      data: findVehical,
    });
  } catch (error) {
    console.log("customerVehicalUpdateController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerShopVehicalController = async (req, res) => {
  try {
    const { ShopId } = req.params;
    const findShop = await shops.findById(ShopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const findVehical = await customerVehical.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerData",
        },
      },
      {
        $unwind: "$customerData",
      },
      {
        $match: {
          "customerData.shopId": new ObjectId(ShopId),
        },
      },
      {
        $group: {
          _id: "$customerData._id", // Group by customer ID
          customerData: { $first: "$customerData" }, // Keep customer data
          vehicles: {
            $push: {
              _id: "$_id", // Vehicle ID
              model: "$model",
              year: "$year",
              make: "$make",
              vin: "$vin",
              // add other vehicle fields you want to include
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          customer: "$customerData",
          vehicles: 1,
        },
      },
    ]);
    if (findVehical.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Vehical Found For the Shop !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Shop Vehicals !!!",
      data: findVehical,
    });
  } catch (error) {
    console.log("customerShopVehicalController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const pointOfImpactController = async (req, res) => {
  try {
    const { vehicalId, point } = req.params;
    const vehicalFound = await customerVehical.findById(vehicalId);
    if (!vehicalFound) {
      return res.status(404).json({
        success: false,
        msg: "Vehical Not Found !!!",
      });
    }
    vehicalFound.PointOfImpact[point] = !vehicalFound.PointOfImpact[point];
    vehicalFound.save();
    res.status(200).json({
      success: true,
      msg: "The Point of Impact has been Updated",
    });
  } catch (error) {
    console.log("pointOfImpactController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const removeCustomerVehicalController = async (req, res) => {
  try {
    const { customerId, vehicleId } = req.params;

    const vehicle = await customerVehical.findOne({
      _id: vehicleId,
      customerId: customerId,
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        msg: "Vehicle not found for this customer!",
      });
    }

    await customerVehical.deleteOne({ _id: vehicleId });

    res.status(200).json({
      success: true,
      msg: "Vehicle removed successfully!",
    });
  } catch (error) {
    console.error("removeCustomerVehicalController Error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

const bulkRemoveCustomerVehiclesController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { vehicleIds } = req.body;

    if (!Array.isArray(vehicleIds) || vehicleIds.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Please provide an array of vehicle IDs to delete.",
      });
    }

    const result = await customerVehical.deleteMany({
      _id: { $in: vehicleIds },
      customerId: customerId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        msg: "No vehicles found for this customer or invalid IDs provided.",
      });
    }

    res.status(200).json({
      success: true,
      msg: `${result.deletedCount} vehicle(s) removed successfully!`,
    });
  } catch (error) {
    console.error("bulkRemoveCustomerVehiclesController Error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  customerVehicalRegesterController,
  customerVehicalController,
  customerVehicalDetailController,
  customerVehicalUpdateController,
  customerShopVehicalController,
  pointOfImpactController,
  removeCustomerVehicalController,
  bulkRemoveCustomerVehiclesController
};
