const usersModel = require("../models/userModel");

// Helper function to convert permissions object to array
const convertPermissionsToArray = (permissionsObj) => {
  return Object.entries(permissionsObj).map(([module, level]) => `${module}:${level}`);
};

// Helper function to convert permissions array to object
const convertPermissionsToObject = (permissionsArray) => {
  return permissionsArray.reduce((obj, perm) => {
    const [module, level] = perm.split(':');
    obj[module] = level;
    return obj;
  }, {});
};

const staffPermissionController = {
  // Get all staff members
  getAllStaff: async (req, res) => {
    try {
      const { shopId } = req.body;
      const staffMembers = await usersModel.find({ shopId }).select('-password -showPassword -newPasswordToken');
      
      res.status(200).json({
        success: true,
        data: staffMembers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching staff members",
        error: error.message
      });
    }
  },

  // Add new staff member
  addStaff: async (req, res) => {
    try {
      const {
        shopId,
        email,
        userName,
        password,
        firstName,
        lastName,
        phone,
        employeeTile,
        permissions = {}
      } = req.body;

      // Convert permissions object to array of permission strings
      const permissionsArray = Object.entries(permissions).map(([module, level]) => `${module}:${level}`);

      // Check if email already exists
      const existingStaff = await usersModel.findOne({ email });
      if (existingStaff) {
        return res.status(400).json({
          success: false,
          message: "Email already registered"
        });
      }

      const newStaff = new usersModel({
        shopId,
        email,
        userName,
        password,
        showPassword: password, // Note: In production, implement proper password hashing
        firstName,
        lastName,
        phone,
        employeeTile,
        permissions: permissionsArray,
        activeStatue: true
      });

      await newStaff.save();

      const staffData = newStaff.toObject();
      delete staffData.password;
      delete staffData.showPassword;
      delete staffData.newPasswordToken;

      res.status(201).json({
        success: true,
        message: "Staff member added successfully",
        data: staffData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding staff member",
        error: error.message
      });
    }
  },

  // Update staff permissions
  updatePermissions: async (req, res) => {
    try {
      const { staffId, permissions } = req.body;

      const updatedStaff = await usersModel.findByIdAndUpdate(
        staffId,
        { $set: { permissions } },
        { new: true }
      ).select('-password -showPassword -newPasswordToken');

      if (!updatedStaff) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Permissions updated successfully",
        data: updatedStaff
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating permissions",
        error: error.message
      });
    }
  },

  // Update staff details
  updateStaff: async (req, res) => {
    try {
      const { staffId } = req.params;
      const updateData = req.body;

      // Remove sensitive fields from update data
      delete updateData.password;
      delete updateData.showPassword;
      delete updateData.newPasswordToken;

      const updatedStaff = await usersModel.findByIdAndUpdate(
        staffId,
        { $set: updateData },
        { new: true }
      ).select('-password -showPassword -newPasswordToken');

      if (!updatedStaff) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Staff member updated successfully",
        data: updatedStaff
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating staff member",
        error: error.message
      });
    }
  },

  // Delete staff member
  deleteStaff: async (req, res) => {
    try {
      const { staffId } = req.params;

      const deletedStaff = await usersModel.findByIdAndDelete(staffId);

      if (!deletedStaff) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Staff member deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting staff member",
        error: error.message
      });
    }
  },

  // Batch update permissions for multiple staff members
  batchUpdatePermissions: async (req, res) => {
    try {
      const { staffIds, permissions } = req.body;

      const updatePromises = staffIds.map(staffId =>
        usersModel.findByIdAndUpdate(
          staffId,
          { $set: { permissions } },
          { new: true }
        ).select('-password -showPassword -newPasswordToken')
      );

      const updatedStaff = await Promise.all(updatePromises);

      res.status(200).json({
        success: true,
        message: "Batch permissions update successful",
        data: updatedStaff
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating batch permissions",
        error: error.message
      });
    }
  }
};

module.exports = staffPermissionController;
