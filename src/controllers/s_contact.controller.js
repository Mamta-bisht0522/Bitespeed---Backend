const User = require("../models/s_contact.model");

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
      });
      res.status(201).json({
        message: "new user created successfully",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.findAll();
      res.status(200).json({
        message: "All user retrived successfully",
        data: allUsers,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "user retrived successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const updatedUser=await User.update(req.body,{
        where :{
          id:req.params.id
        }
      })
      res.status(200).json({
        message:"user by id updated successfully",
        data:updatedUser
      })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  deleteUserById: async(req,res)=>{
    try {
      await User.destroy({
        where:{
          id:req.params.id
        }
      })
      res.status(200).json({
        message:"user deleted successfully"
      })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

module.exports = userController;
