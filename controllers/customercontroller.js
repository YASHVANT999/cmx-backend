const customers = require("../models/customerModel");
const shops = require("../models/shopModel");

const customerRegesterController = async (req, res) => {
  try {
    const {
      shopId,
      firstName,
      lastName,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      companyName,
    } = req.body;
    const shop = await shops.findById(shopId);
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, msg: "Shop not Found!!", data: [] });
    }
    const getCustomer = await customers.create({
      shopId,
      firstName,
      lastName,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      companyName,
    });
    res.status(200).json({
      success: true,
      msg: "Customer created Sucessfully !!!",
      data: getCustomer,
    });
    console.log("customerRegesterController====> customer created");
  } catch (error) {
    console.log("customerRegesterController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerGetDetailController = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerDetail = await customers.findById(customerId);
    if (!customerDetail) {
      return res.status(404).json({
        success: false,
        msg: "Customer Not Found !!",
        err: error,
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      msg: "Customer Found!!",
      data: customerDetail,
    });
    console.log("customerGetDetailController=>>> customer Found");
  } catch (error) {
    console.log("customerGetDetailController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerAddGetDetailController = async (req, res) => {
  console.log(req.body);
  try {
    const {
      customerId,
      firstName,
      lastName,
      phone,
      phone2,
      email,
      address,
      city,
      state,
      zipCode,
      country,
      companyName,
    } = req.body;
    customers
      .updateOne(
        { _id: customerId },
        {
          $set: {
            firstName,
            lastName,
            phone,
            phone2,
            email,
            address,
            city,
            state,
            zipCode,
            country,
            companyName,
          },
        }
      )
      .then((response) =>
        res.status(200).json({
          success: true,
          msg: "Updated",
        })
      )
      .catch((error) =>
        res.status(400).json({
          success: false,
          err: error,
          data: [],
        })
      );
  } catch (error) {
    console.log("customerAddGetDetailController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const searchCustomerInShopController = async (req, res) => {
  const { id, text, page } = req.params;
  if (!text) {
    return res.status(404).json({
      sucess: false,
      msg: "No Such Text Send",
      data: [],
    });
  }
  try {
    const results = await customers.find({ shopId: id });
    if (!results) {
      return res.status(404).json({
        sucess: false,
        msg: "No Such Data Found",
        data: [],
      });
    }
    const filterResult = results.filter((item) =>
      new RegExp(`^${text}[a-zA-Z]*$`, "i").test(item.firstName)
    );
    if (filterResult.length === 0) {
      return res.status(404).json({
        sucess: false,
        msg: "No Such Data Found",
        data: [],
      });
    }

    const pageSize = 25;

    const skip = (page - 1) * pageSize;

    const paginatedResults = data.slice(skip, skip + pageSize);

    res.status(200).json({
      sucess: true,
      msg: "Here is your Found data",
      data: paginatedResults,
    });
    console.log("searchCustomerInShopController>>>>");
  } catch (error) {
    console.log("searchCustomerInShopController>>>", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const getAllCustomerOfShopController = async (req, res) => {
  const { shopId, page } = req.params;
  try {
    const data = await customers.find({ shopId }).sort({ firstName: 1 });
    if (!data) {
      return res.status(404).json({
        sucess: false,
        msg: "No Such Shop Found",
        data: [],
      });
    }

    const pageSize = 25;

    const skip = (page - 1) * pageSize;

    const paginatedResults = data.slice(skip, skip + pageSize);

    res.status(200).json({
      sucess: true,
      msg: "Your shop Customers Found!!",
      data: paginatedResults,
    });
    console.log("getAllCustomerOfShopController>>>>");
  } catch (error) {
    console.log("getAllCustomerOfShopController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const customerIdSearchController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const getData = await customers.findOne({ customerId });
    if (!getData) {
      return res.status(404).json({
        success: false,
        msg: "Customer Not Found!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your Customer is Found !!!",
      data: getData,
    });
  } catch (error) {
    console.log("customerIdSearchController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const customerLinkController = async (req, res) => {
  try {
    const {
      id,
      shopId,
      customerId,
      firstName,
      lastName,
      phone,
      phone2,
      email,
    } = req.body;
    const newMember = {
      firstName,
      lastName,
      phone,
      phone2,
      email,
    };

    const addCustomer = await customers.updateOne(
      { _id: id },
      {
        $push: {
          familyMembers: newMember,
        },
      }
    );

    res.status(200).json({
      success: true,
      msg: "The member Added!!!!",
      data: addCustomer,
    });
  } catch (error) {
    console.log("customerLinkontroller", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const customerFamilyMenberController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await customers.findById(id);
    res.status(200).json({
      success: true,
      msg: "Your Family Members are Found!!!",
      data: data.familyMembers,
    });
  } catch (error) {
    console.log("customerFamilyMenberController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

module.exports = {
  customerIdSearchController,
  customerRegesterController,
  customerGetDetailController,
  customerAddGetDetailController,
  searchCustomerInShopController,
  getAllCustomerOfShopController,
  customerLinkController,
  customerFamilyMenberController,
};
