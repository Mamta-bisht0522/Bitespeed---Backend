const User = require("../models/s_contact.model");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { phone: phone }],
        },
      });

      if (user) {
        const newUser = await User.create({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          email: email,
          password: await bcrypt.hash(password, 10),
          phone: phone,
          linkedId: user.id,
        });
        res.status(201).json({
          message: "new user created successfully",
          data: newUser,
        });
      } else {
        const newUser = await User.create({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          email: email,
          password: await bcrypt.hash(password, 10),
          phone: phone,
          linkedId: null,
        });
        res.status(201).json({
          message: "new user created successfully",
          data: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      // const allUsers = await User.findAll();
      const [results] = await User.sequelize.query("select * from users");
      res.status(200).json({
        message: "All user retrived successfully",
        data: results,
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
      const updatedUser = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "user by id updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "user deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = userController;
