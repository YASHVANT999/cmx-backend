const { check, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error, index) => error.msg);
    return res
      .status(400)
      .json({ success: false, errors: errors.mapped(), msg: errorMessages });
  }
  next();
};

const validateLogIn = [
  check("shopId").notEmpty().withMessage("Shop Id is required!"),
  check("username")
    .notEmpty()
    .withMessage("Username is required!"),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters!"),
  handleValidationErrors,
];

const validateRegistration = [
  check("email").trim().isEmail().withMessage("Invalid email format"),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  check("shopId").isMongoId().withMessage("Not a Valid mongoId"),
  handleValidationErrors,
];

const validateUserDetails = [
  check("id").isMongoId().withMessage("ID is not a MongoId"),
  handleValidationErrors,
];

const validateShopDetails = [
  check("shopName")
    .isLength({ min: 8 })
    .withMessage("shopName must have at least 8 characters"),
  check("address")
    .isLength({ min: 6 })
    .withMessage("Address must have at least 6 characters"),
  check("city").notEmpty().withMessage("City cannot be empty"),
  check("state").notEmpty().withMessage("State cannot be empty"),
  check("zipCode")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Zip code must have at least 5 characters"),
  check("country").notEmpty().withMessage("Country cannot be empty"),
  // check("dateFormat")
  //   .isDate()
  //   .withMessage("DateFormat must be in the date format"),
  check("timeZone").notEmpty().withMessage("TimeZone cannot be empty"),
  check("timeFormat").notEmpty().withMessage("TimeFormat cannot be empty"),
  // check("website")
  //   .optional({ nullable: true, checkFalsy: true })
  //   .isURL()
  //   .withMessage("Invalid URL format"),
  check("fullName").notEmpty().withMessage("FullName cannot be empty"),
  check("phone1")
    .notEmpty()
    .withMessage("Phone1 cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone1 should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone1 should be 10 digits long"),
  check("phone2")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric({ no_symbols: true })
    .withMessage("Phone2 should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone2 should be 10 digits long"),
  check("fax").optional({ nullable: true, checkFalsy: true }),
  handleValidationErrors,
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      fs.unlinkSync(
        path.join(__dirname, `../public/uploads/${req.file.filename}`)
      );
    }
    next();
  },
];

const validateAddUserDetail = [
  check("userId")
    .isMongoId()
    .withMessage("userId is not a valid MongoDB ObjectId"),
  check("firstName")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("First name should be at least 6 characters long"),
  check("lastName")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Last name should be at least 6 characters long"),
  check("phone")
    .optional({ nullable: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone should be 10 digits long"),
  check("phone2")
    .optional({ nullable: true, checkFalsy: true })
    .notEmpty()
    .withMessage("Phone2 cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone2 should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone2 should be 10 digits long"),
  check("address")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Address should be at least 6 characters long"),
  check("city")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("City should be at least 6 characters long"),
  check("state")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("State should be at least 2 characters long"),
  check("zipCode")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric({ no_symbols: true })
    .withMessage("Zip code should contain only digits")
    .isLength({ min: 6, max: 6 })
    .withMessage("Zip code should be 6 digits long"),
  check("country")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Country should be at least 2 characters long"),
  check("companyName")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Company name should be at least 6 characters long"),
  handleValidationErrors,
];

const validatecustomerRegester = [
  check("shopId").isMongoId().withMessage("It is not a valid Mongo Id"),
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First Name should be at least 6 characters long"),
  check("lastName")
    .isLength({ min: 3 })
    .withMessage("Last Name should be at least 6 characters long"),
  check("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone should be 10 digits long"),
  check("phone2")
    .notEmpty()
    .withMessage("Phone1 cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone1 should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone1 should be 10 digits long"),
  check("email").trim().isEmail().withMessage("Invalid email format"),
  handleValidationErrors,
];

const validatecustomerUpdate = [
  check("customerId")
    .isMongoId()
    .withMessage("customerId is not a valid MongoDB ObjectId"),
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First Name should be at least 6 characters long"),
  check("lastName")
    .isLength({ min: 3 })
    .withMessage("Last Name should be at least 6 characters long"),
  check("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone should be 10 digits long"),
  check("phone2")
    .notEmpty()
    .withMessage("Phone1 cannot be empty")
    .isNumeric({ no_symbols: true })
    .withMessage("Phone1 should contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone1 should be 10 digits long"),
  check("email").trim().isEmail().withMessage("Invalid email format"),
  check("address").notEmpty().withMessage("address cannot be empty"),
  check("city").notEmpty().withMessage("city cannot be empty"),
  check("state").notEmpty().withMessage("state cannot be empty"),
  check("zipCode").notEmpty().withMessage("zipCode cannot be empty"),
  check("country").notEmpty().withMessage("country cannot be empty"),
  check("companyName").notEmpty().withMessage("companyName cannot be empty"),
  handleValidationErrors,
];

const validatecustomerDetail = [
  check("id").isMongoId().withMessage("ID is not a MongoId"),
  handleValidationErrors,
];

const validategetAllCustomerInShopController = [
  check("shopId").isMongoId().withMessage("ID is not a MongoId"),
  handleValidationErrors,
];

const customerVehicalRegistrationValidation = [
  check("customerId").notEmpty().isMongoId().withMessage("ID is not a MongoId"),
  check("vin").notEmpty(),
  check("year").notEmpty(),
  check("make").notEmpty(),
  check("model").notEmpty(),
  check("engine"),
  check("exteriorColor"),
  check("exteriorCode"),
  check("interiorColor"),
  check("trimCode"),
  check("vehicleCondition"),
  check("odometer"),
  check("productionDate"),
  check("licensePlate"),
  check("state"),
  handleValidationErrors,
];

const customerVehicalValidation = [
  check("customerId").notEmpty().isMongoId().withMessage("ID is not a MongoId"),
  handleValidationErrors,
];

const customerVehicalDetailValidation = [
  check("id").notEmpty().isMongoId().withMessage("ID is not a MongoId"),
  handleValidationErrors,
];

module.exports = {
  validateLogIn,
  validateRegistration,
  validateUserDetails,
  validateShopDetails,
  validateAddUserDetail,
  validatecustomerRegester,
  validatecustomerUpdate,
  validatecustomerDetail,
  validategetAllCustomerInShopController,
  customerVehicalRegistrationValidation,
  customerVehicalValidation,
  customerVehicalDetailValidation,
};
