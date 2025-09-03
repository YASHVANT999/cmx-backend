const express = require("express");
const router = express.Router();
const staffPermissionController = require("../controllers/staffPermissionController");
const authTokenCheck = require("../middleware/authTokenCkeck");

// Apply authentication middleware to all routes
// router.use(authTokenCheck);

// Get all staff members
router.post("/getAll", staffPermissionController.getAllStaff);

// Add new staff member
router.post("/add", staffPermissionController.addStaff);

// Update staff permissions
router.put("/permissions", staffPermissionController.updatePermissions);

// Batch update permissions for multiple staff
router.put("/permissions/batch", staffPermissionController.batchUpdatePermissions);

// Update staff details
router.put("/:staffId", staffPermissionController.updateStaff);

// Delete staff member
router.delete("/:staffId", staffPermissionController.deleteStaff);

module.exports = router;
