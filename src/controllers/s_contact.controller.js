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
        message:"new user created successfully",
        data : newUser
      })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports=userController
